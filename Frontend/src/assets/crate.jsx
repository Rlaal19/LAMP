import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Create = () => {
    const [name, setName] = useState("");
    const [sur, setSur] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('/api/humans', { F_name: name, L_name: sur })
            .then(result => {
                if (result.status === 200) { // 201 หมายถึง "Created"
                    alert(result.data.message || "Add User success");
                    window.location.reload(); // รีเฟรชหน้าเพื่ออัปเดตข้อมูล
                } else {
                    alert("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้!");
                    window.location.reload();
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("ไม่สามารถสร้างผู้ใช้ได้ กรุณาลองอีกครั้ง!");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-3 ml-20 mr-20 flex justify-center bg-slate-100 py-6 rounded-xl">
                <div className="flex items-center mr-4">
                    <label className="mr-2">Name</label>
                    <input
                        type="text"
                        placeholder="name"
                        className="input input-bordered input-sm w-full max-w-xs rounded-md"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center">
                    <label className="mr-2">Surname</label>
                    <input
                        type="text"
                        placeholder="surname"
                        className="input input-bordered input-sm w-full max-w-xs rounded-md"
                        onChange={(e) => setSur(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center">
                    <button type="submit" className="btn btn-primary ml-5">
                        Create <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Create;
