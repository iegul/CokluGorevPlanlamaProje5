import React from "react";
import { Timeline, Typography, Button } from "antd";
import tasksData from "../config/task.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import "./Cizelge.css";
const { Text } = Typography;

const Cizelge = () => {
  // Timeline öğelerini render eden fonksiyon
  //      renderTimelineItems: tasksData'dan gelen verileri kullanarak zaman çizelgesi öğelerini oluşturur. Her görev için:
  // Görevin başlık ve tarih bilgilerini gösterir.
  // Atanan kişilerin isimlerini gösterir.
  // Alt görevler varsa, bunları liste olarak gösterir.
  const renderTimelineItems = () => {
    return tasksData.map((task) => (
      <Timeline.Item key={task.id}>
        <h3>{task.todo}</h3>
        <p>
          <strong>Başlangıç Tarihi:</strong>{" "}
          {task.startDate ? new Date(task.startDate).toLocaleDateString() : "-"}
        </p>
        <p>
          <strong>Bitiş Tarihi:</strong>{" "}
          {task.endDate ? new Date(task.endDate).toLocaleDateString() : "-"}
        </p>
        <p>
          <strong>Atanan Kişiler:</strong>{" "}
          {task.users
            .map((user) => (typeof user === "string" ? user : user.first_name))
            .join(", ")}
        </p>
        {task.subtasks && (
          <>
            <h4>Alt Görevler:</h4>
            <ul>
              {task.subtasks.map((subtask) => (
                <li key={subtask.id}>
                  {subtask.content} -{" "}
                  {subtask.details.startDate
                    ? new Date(subtask.details.startDate).toLocaleDateString()
                    : "-"}{" "}
                  to{" "}
                  {subtask.details.endDate
                    ? new Date(subtask.details.endDate).toLocaleDateString()
                    : "-"}{" "}
                  (
                  {subtask.details.selectedUsers.length > 0
                    ? subtask.details.selectedUsers
                        .map((user) =>
                          typeof user === "string" ? user : user.first_name
                        )
                        .join(", ")
                    : "No users assigned"}
                  )
                </li>
              ))}
            </ul>
          </>
        )}
      </Timeline.Item>
    ));
  };
  // Geri butonuna tıklandığında çalışacak fonksiyon
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/giris");
  };
  return (
    <div className="cizelge-container">
      <div className="cizelge-content">
        <h1>Görevler ve Alt Görevler Çizelgesi</h1>
        <Timeline mode="left">{renderTimelineItems()}</Timeline>
        <Link to="/giris">
          <Button type="" onClick={handleBackClick} className="back-button">
            <LeftOutlined />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cizelge;
