import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXYKW4bzj0pwAtt3yPHQGXFD1TameMHyw",
  authDomain: "pksstand.firebaseapp.com",
  projectId: "pksstand",
  storageBucket: "pksstand.firebasestorage.app",
  messagingSenderId: "1009274020815",
  appId: "1:1009274020815:web:9851275ff7b6494576e8ba",
  measurementId: "G-7ZJDCRH03K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const btnCreate = document.getElementById('btn-create');
    const btnDatabase = document.getElementById('btn-database');
    const btnBug = document.getElementById('btn-bug');
    const uploadModal = document.getElementById('upload-modal');
    const btnCloseUpload = document.getElementById('btn-close-upload');
    const btnSaveUpload = document.getElementById('btn-save-upload');

    // 1. ปุ่มกดสร้าง: เด้งไปหน้า stand.html
    btnCreate.addEventListener('click', () => {
        window.location.href = 'stand.html';
    });

    // 2. ปุ่มกดบวกฐานข้อมูล: เปิด Modal อัปโหลดรูปและชื่อ
    btnDatabase.addEventListener('click', () => {
        uploadModal.style.display = 'flex';
    });

    btnCloseUpload.addEventListener('click', () => {
        uploadModal.style.display = 'none';
    });

    // บันทึกข้อมูลรูปภาพและชื่อลง Firestore
    btnSaveUpload.addEventListener('click', async () => {
        const nameInput = document.getElementById('char-name').value;
        const fileInput = document.getElementById('char-image').files[0];

        if (!nameInput || !fileInput) {
            alert('กรุณากรอกชื่อและเลือกรูปภาพให้ครบถ้วน');
            return;
        }

        alert('กำลังอัปโหลดข้อมูลเข้าระบบ...');

        // แปลงไฟล์รูปเป็น Base64 เพื่อเก็บบันทึกลง Firestore เบื้องต้น
        const reader = new FileReader();
        reader.readAsDataURL(fileInput);
        reader.onload = async () => {
            try {
                await addDoc(collection(db, "character_database"), {
                    name: nameInput,
                    imageBase64: reader.result,
                    timestamp: new Date()
                });
                alert('บันทึกข้อมูลสำเร็จ!');
                uploadModal.style.display = 'none';
                document.getElementById('char-name').value = '';
                document.getElementById('char-image').value = '';
            } catch (error) {
                console.error('เกิดข้อผิดพลาด: ', error);
                alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            }
        };
    });

    // 3. ปุ่มแจ้งบัค
    btnBug.addEventListener('click', async () => {
        const bugDescription = prompt('กรุณากรอกรายละเอียดปัญหาหรือบัคที่พบ:');
        if (bugDescription) {
            alert('ระบบกำลังส่งแจ้งเตือนไปยัง Firebase...');
            try {
                await addDoc(collection(db, "bug_reports"), {
                    description: bugDescription,
                    status: "pending",
                    timestamp: new Date()
                });
                alert('ส่งแจ้งบัคสำเร็จ!');
            } catch (error) {
                console.error('เกิดข้อผิดพลาด: ', error);
            }
        }
    });
});
