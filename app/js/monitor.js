const path = require('path');
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;

let cpuOverload = 80;

notifyUser({
  title: 'CPU overload',
  body: `CPU is over ${cpuOverload}%`,
  icon: path.join(__dirname, 'img', 'cpu.png'),
});

setInterval(() => {
  // CPU usage
  cpu.usage().then((info) => {
    document.getElementById('cpu-usage').innerText = info.toFixed(2) + '%';

    document.getElementById('cpu-progress').style.width = info + '%';

    // Make progress bar red if overload
    if (info >= cpuOverload) {
      document.getElementById('cpu-progress').style.backgroundColor = 'red';
    } else {
      document.getElementById('cpu-progress').style.backgroundColor = '#30c88b';
    }
  });

  // CPU free
  cpu.free().then((info) => {
    document.getElementById('cpu-free').innerText = info.toFixed(2) + '%';
  });

  // Uptime
  document.getElementById('sys-uptime').innerText = secondsToDmhs(os.uptime());
}, 2000);

// Set model
document.getElementById('cpu-model').innerText = cpu.model();

// Computer name
document.getElementById('comp-name').innerText = os.hostname();

// OS
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`;

// Total Mem
mem.info().then((info) => {
  document.getElementById('mem-total').innerText = info.totalMemMb;
});

// Show days, hours, minutes
function secondsToDmhs(seconds) {
  seconds = +seconds;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d, ${h}h, ${m}m, ${s}s`;
}

// Send notifications
function notifyUser(options) {
  new Notification(options.title, options);
}
