// นำเข้า Firebase SDK จาก CDN แบบ ES Module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ค่า Config ของคุณจาก Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCXYKW4bzj0pwAtt3yPHQGXFD1TameMHyw",
  authDomain: "pksstand.firebaseapp.com",
  projectId: "pksstand",
  storageBucket: "pksstand.firebasestorage.app",
  messagingSenderId: "1009274020815",
  appId: "1:1009274020815:web:9851275ff7b6494576e8ba",
  measurementId: "G-7ZJDCRH03K"
};

// เริ่มต้นใช้งาน Firebase และ Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const btnCreate = document.getElementById('btn-create');
    const btnDatabase = document.getElementById('btn-database');
    const btnBug = document.getElementById('btn-bug');

    // 1. ปุ่มกดสร้าง: เด้งไปหน้า stand.html
    btnCreate.addEventListener('click', () => {
        window.location.href = 'stand.html';
    });

    // 2. ปุ่มกดบวกฐานข้อมูล: บันทึกข้อมูลมาตรฐานลง Firestore จริง
    btnDatabase.addEventListener('click', async () => {
        alert('กำลังส่งข้อมูลเพิ่มฐานข้อมูลไปที่ Firebase...');
        try {
            await addDoc(collection(db, "standard_databases"), {
                action: "add_standard_database",
                status: "active",
                timestamp: new Date()
            });
            alert('เพิ่มฐานข้อมูลมาตรฐานสำเร็จ!');
        } catch (error) {
            console.error('เกิดข้อผิดพลาด: ', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    });

    // 3. ปุ่มแจ้งบัค: บันทึกข้อมูลปัญหาลง Firestore จริง
    btnBug.addEventListener('click', async () => {
        const bugDescription = prompt('กรุณากรอกรายละเอียดปัญหาหรือบัคที่พบ:');
        if (bugDescription) {
            alert('ระบบกำลังส่งแจ้งเตือนบัคไปยัง Firebase...');
            try {
                await addDoc(collection(db, "bug_reports"), {
                    description: bugDescription,
                    status: "pending",
                    timestamp: new Date()
                });
                alert('ส่งแจ้งบัคสำเร็จ!');
            } catch (error) {
                console.error('เกิดข้อผิดพลาด: ', error);
                alert('เกิดข้อผิดพลาดในการส่งแจ้งบัค');
            }
        }
    });
});
