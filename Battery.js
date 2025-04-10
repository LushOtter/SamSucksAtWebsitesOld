if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
        function updateBatteryStatus() {
            const batteryStatus = document.getElementById('batteryStatus');
            const batteryIcon = document.getElementById('batteryIcon');
            const batteryPercentage = document.getElementById('batteryPercentage');
            
            const level = (battery.level * 100).toFixed(0);
            const chargingStatus = battery.charging ? 'Charging' : 'Not Charging';

            batteryPercentage.textContent = `${level}%`;

            if (battery.charging) {
                batteryIcon.textContent = 'battery_charging_full';
            } else {
                if (level >= 75) {
                    batteryIcon.textContent = 'battery_full';
                } else if (level >= 50) {
                    batteryIcon.textContent = 'battery_50';
                } else if (level >= 25) {
                    batteryIcon.textContent = 'battery_20';
                } else {
                    batteryIcon.textContent = 'battery_alert';
                }
            }
        }

        updateBatteryStatus();

        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);
    });
} else {
    console.log('Battery Status API is not supported on this device.');
}

function updateTime() {
    const clock = document.getElementById('clock');
    const currentTime = new Date();

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    clock.textContent = `Time: ${timeString}`;
}

setInterval(updateTime, 1000);

updateTime();
