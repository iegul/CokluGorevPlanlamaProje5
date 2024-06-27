import React, { useState } from "react";
import { Calendar, Badge, Button, Modal, List, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import tasksData from "../config/task.json";
import "./Takvim.css";

const { Text } = Typography;
const Takvim = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const generateEvents = (tasks) => {
    return tasks.flatMap((task) => {
      const events = [];
      const addEvent = (title, users, startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        return Array.from({ length: days }, (_, index) => ({
          title,
          users,
          date: new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate() + index
          )
            .toISOString()
            .split("T")[0],
        }));
      };
      if (task.startDate && task.endDate) {
        events.push(
          ...addEvent(task.todo, task.users, task.startDate, task.endDate)
        );
      }
      task.subtasks.forEach((subtask) => {
        if (subtask.details.startDate && subtask.details.endDate) {
          events.push(
            ...addEvent(
              subtask.content,
              subtask.details.selectedUsers,
              subtask.details.startDate,
              subtask.details.endDate
            )
          );
        }
      });
      return events;
    });
  };
  const events = generateEvents(tasksData);
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const handleBackClick = () => {
    navigate("/giris");
  };
  const dateCellRender = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const eventsToday = events.filter((event) => event.date === formattedDate);

    return (
      <ul className="events">
        {eventsToday.map((event, index) => (
          <li key={index}>
            <Badge status="success" text={event.title} />
          </li>
        ))}
      </ul>
    );
  };
  const handleDateClick = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const eventsToday = events.filter((event) => event.date === formattedDate);
    setSelectedDateEvents(eventsToday);
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const renderModalContent = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={selectedDateEvents}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={
                item.users.length > 0
                  ? item.users
                      .map((user, index) => (
                        <Text key={index}>
                          {typeof user === "string" ? user : user.first_name}
                        </Text>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])
                  : "No users assigned"
              }
            />
          </List.Item>
        )}
      />
    );
  };
  return (
    <div className="takvim-container">
      <Button type="" onClick={handleBackClick} className="back-button">
        <LeftOutlined />
      </Button>
      <Calendar
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
        onSelect={handleDateClick}
      />
      <Modal
        title="Görevler ve Alt Görevler"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Kapat
          </Button>,
        ]}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Takvim;
