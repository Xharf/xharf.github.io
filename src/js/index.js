console.log('Hello World');

// let sys_device = "sysInfo-240D6Br2EA-7zFXY"
let sys_device = "sysInfo-5e_Mnlaj7fw1DhrF"

fetch(`https://fire-detection-xharf.herokuapp.com/sysinfo/${sys_device}`)
    .then(response => response.json())
    .then(({
      data: {
        sysInfo: {
          name: device_name,
          location
        }
      }
    }) => {
      document.getElementById('device-name').innerHTML = device_name;
      document.getElementById('device-location').setAttribute('src', location);
    })
    .catch(error => console.error(error));

setInterval(function () {
  fetch(`https://fire-detection-xharf.herokuapp.com/lastdatahistory/${sys_device}`)
    .then(response => response.json())
    .then(({
      data: {
        lastDataHistory: datahistory
      }
    }) => {
      document.getElementById('flash-message').innerHTML = "";
      document.getElementById('value-temp').innerHTML = datahistory.temperature;
      document.getElementById('value-humidity').innerHTML = datahistory.humidity;
      document.getElementById('value-gas').innerHTML = datahistory.gas_density;
      if (datahistory.is_there_fire == true) {
        document.getElementById('value-flame').innerHTML = "YES";
      } else {
        document.getElementById('value-flame').innerHTML = "NO";
      }
      document.getElementById('tanggal-data').innerHTML = new Date(datahistory.created_at);
    })
    .catch(error => {
      document.getElementById('flash-message').innerHTML = "Data History Connection Failed. Reconnecting..."
      console.error(error)}
      );


  fetch(`https://fire-detection-xharf.herokuapp.com/lastsyshistory/${sys_device}`)
    .then(response => response.json())
    .then(({
      data: {
        lastSysHistory: sysHistory
      }
    }) => {
      document.getElementById('status-wifi').innerHTML = sysHistory.wifi_status;
      document.getElementById('status-bluetooth').innerHTML = sysHistory.bluetooth_status;
      document.getElementById('status-dht11').innerHTML = sysHistory.dht_status;
      document.getElementById('status-flame').innerHTML = sysHistory.flame_status;
      document.getElementById('status-mq7').innerHTML = sysHistory.mq_status;
    }).catch(error => console.error(error));
    console.log('Hello World');
}, 500);