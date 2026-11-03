document.addEventListener('DOMContentLoaded', () => {
    const btnCreate = document.getElementById('btn-create');
    const btnDatabase = document.getElementById('btn-database');
    const btnBug = document.getElementById('btn-bug');

    // 1. ปุ่มกดสร้าง: เด้งไปที่หน้า stand.html
    btnCreate.addEventListener('click', () => {
        window.location.href = 'stand.html';
    });

    // 2. ปุ่มกดบวกฐานข้อมูล: จำลองการทำงานเชื่อมต่อ Firebase
    btnDatabase.addEventListener('click', async () => {
        alert('กำลังส่งข้อมูลเพิ่มฐานข้อมูลไปที่ Firebase...');
        try {
            console.log('เพิ่มฐานข้อมูลสำเร็จ');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเพิ่มฐานข้อมูล: ', error);
        }
    });

    // 3. ปุ่มแจ้งบัค: ส่งข้อมูลแจ้งปัญหาไปที่ Firebase
    btnBug.addEventListener('click', async () => {
        const bugDescription = prompt('กรุณากรอกรายละเอียดปัญหาหรือบัคที่พบ:');
        if (bugDescription) {
            alert('ระบบกำลังส่งแจ้งเตือนบัคไปยัง Firebase...');
            try {
                console.log('ส่งแจ้งบัคสำเร็จ');
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการส่งแจ้งบัค: ', error);
            }
        }
    });
});
