import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Modal,
  List,
  DatePicker,
} from "antd";
import { getCurrentUserNamesFromFirebase } from "../config/firebaseHelper";
import DateComponent from "./DateComponent";
import tasksData from "../config/task.json"; // Proje yapınıza göre yolunu ayarlayın

const { Option } = Select;

const Gorevler = () => {
  const [todoInputs, setTodoInputs] = useState({
    todo: "",
    startDate: null,
    endDate: null,
  });
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [firebaseUsers, setFirebaseUsers] = useState([]);
  const [tasks, setTasks] = useState(tasksData); // JSON dosyasından gelen başlangıç görevleri

  const [modalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtaskModalVisible, setSubtaskModalVisible] = useState(false);
  const [currentSubtask, setCurrentSubtask] = useState(null);

  useEffect(() => {
    const fetchFirebaseUsers = async () => {
      try {
        const users = await getCurrentUserNamesFromFirebase();
        setFirebaseUsers(users);
      } catch (error) {
        console.error("Firebase'den kullanıcılar alınamadı:", error);
      }
    };

    fetchFirebaseUsers();
  }, []);

  const handleInputChange = (type, value) => {
    setTodoInputs({
      ...todoInputs,
      [type]: value,
    });
  };

  const handleAddTodo = () => {
    if (!todoInputs.todo || selectedUserIds.length === 0) {
      alert("Lütfen yapılacak işlem ve kullanıcı seçin!");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      todo: todoInputs.todo,
      users: selectedUserIds.map((userId) =>
        firebaseUsers.find((user) => user.id === userId)
      ),
      startDate: todoInputs.startDate,
      endDate: todoInputs.endDate,
      subtasks: subtasks,
    };

    setTasks([...tasks, newTask]);

    setTodoInputs({ todo: "", startDate: null, endDate: null });
    setSelectedUserIds([]);
    setSubtasks([]);
    setModalVisible(false);
  };

  const handleTaskClick = (task) => {
    setCurrentTask(task);
    setSubtasks(task.subtasks ? [...task.subtasks] : []);
    setModalVisible(true);
  };

  const handleDeleteTask = (taskId) => {
    Modal.confirm({
      title: "Görevi Sil",
      content: "Bu görevi silmek istediğinizden emin misiniz?",
      okText: "Evet",
      okType: "danger",
      cancelText: "Hayır",
      onOk() {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      },
    });
  };

  const handleSubtaskAdd = () => {
    const newSubtask = {
      id: subtasks.length + 1,
      content: subtaskInput,
      details: {
        startDate: null,
        endDate: null,
        selectedUsers: [],
      },
    };

    setSubtasks([...subtasks, newSubtask]);
    setSubtaskInput("");
  };

  const handleSubtaskRemove = (subtaskId) => {
    const updatedSubtasks = subtasks.filter(
      (subtask) => subtask.id !== subtaskId
    );
    setSubtasks(updatedSubtasks);
  };

  const handleSubtaskClick = (subtask) => {
    setCurrentSubtask(subtask);
    setSubtaskModalVisible(true);
  };

  const handleSubtaskDetailChange = (key, value) => {
    const updatedSubtask = {
      ...currentSubtask,
      details: { ...currentSubtask.details, [key]: value },
    };
    setCurrentSubtask(updatedSubtask);

    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === currentSubtask.id ? updatedSubtask : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  const handleSubtaskDetailSubmit = () => {
    setSubtaskModalVisible(false);
  };

  const handleSendMail = () => {
    // Seçilen kullanıcılara ve zaman aralığına göre görevleri filtrele
    const filteredTasks = tasks.filter((task) => {
      const taskUsers = task.users.map((user) => user.id);
      const includesUsers = selectedUserIds.every((userId) =>
        taskUsers.includes(userId)
      );

      return (
        includesUsers &&
        (!todoInputs.startDate ||
          new Date(task.startDate) >= todoInputs.startDate) &&
        (!todoInputs.endDate || new Date(task.endDate) <= todoInputs.endDate)
      );
    });

    // Filtrelenmiş görevleri bir modal içinde göster
    Modal.info({
      title: "Görevler Listesi",
      content: (
        <div>
          {filteredTasks.map((task) => (
            <div key={task.id}>
              <h3>{task.todo}</h3>
              <p>
                <strong>Başlangıç Tarihi:</strong> {task.startDate}
              </p>
              <p>
                <strong>Bitiş Tarihi:</strong> {task.endDate}
              </p>
              <ul>
                <strong>Alt Görevler:</strong>
                {task.subtasks.map((subtask) => (
                  <li key={subtask.id}>{subtask.content}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
      onOk() {
        alert("Mail gönderildi!");
      },
    });
  };

  return (
    <Card title="Yapılacaklar" bordered={false}>
      <Form.Item>
        <Input
          value={todoInputs.todo}
          onChange={(e) => handleInputChange("todo", e.target.value)}
          placeholder="Yapılacak işlem giriniz"
        />
      </Form.Item>
      <Form.Item>
        <Select
          mode="multiple"
          placeholder="Kişi seçiniz"
          onChange={(values) => setSelectedUserIds(values)}
          style={{ width: "100%" }}
        >
          {firebaseUsers.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.first_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <DateComponent
          value={todoInputs.startDate}
          onChange={(date) => handleInputChange("startDate", date)}
          placeholder="Başlangıç Tarihi"
          style={{ marginRight: 10 }}
        />
        <DateComponent
          value={todoInputs.endDate}
          onChange={(date) => handleInputChange("endDate", date)}
          placeholder="Bitiş Tarihi"
        />
      </Form.Item>
      <Form.Item>
        <Button className="gonder" type="primary" onClick={handleAddTodo}>
          Görev Ekle
        </Button>
      </Form.Item>

      <div>
        <h4>GÖREVLER</h4>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleTaskClick(task);
                }}
              >
                {task.todo}
              </a>{" "}
              <Button
                type="link"
                danger
                onClick={() => handleDeleteTask(task.id)}
              >
                Sil
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Alt Görevler Modal */}
      <Modal
        title={`Alt Görevler - ${currentTask ? currentTask.todo : ""}`}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            className="gonder"
            key="cancel"
            onClick={() => setModalVisible(false)}
          >
            İptal
          </Button>,
          <Button
            className="gonder"
            key="submit"
            type="primary"
            onClick={handleSubtaskAdd}
          >
            Alt Görev Ekle
          </Button>,
        ]}
      >
        <List
          size="small"
          bordered
          dataSource={subtasks}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  className="gonder"
                  type="link"
                  onClick={() => handleSubtaskClick(item)}
                  key="details"
                >
                  Detay
                </Button>,
                <Button
                  className="gonder"
                  type="link"
                  onClick={() => handleSubtaskRemove(item.id)}
                  danger
                >
                  Sil
                </Button>,
              ]}
            >
              {item.content}
            </List.Item>
          )}
        />
        <Input
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
          placeholder="Alt görev giriniz"
          style={{ marginTop: 10 }}
        />
      </Modal>

      {/* Alt Görev Detayları Modal */}
      <Modal
        title={`Alt Görev Detayları - ${
          currentSubtask ? currentSubtask.content : ""
        }`}
        visible={subtaskModalVisible}
        onCancel={() => setSubtaskModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            className="gonder"
            onClick={() => setSubtaskModalVisible(false)}
          >
            İptal
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubtaskDetailSubmit}
            className="gonder"
          >
            Kaydet
          </Button>,
        ]}
      >
        <Form.Item label="Başlangıç Tarihi">
          <DatePicker
            value={currentSubtask ? currentSubtask.details.startDate : null}
            onChange={(date) => handleSubtaskDetailChange("startDate", date)}
          />
        </Form.Item>
        <Form.Item label="Bitiş Tarihi">
          <DatePicker
            value={currentSubtask ? currentSubtask.details.endDate : null}
            onChange={(date) => handleSubtaskDetailChange("endDate", date)}
          />
        </Form.Item>
        <Form.Item label="Kişi Seçiniz">
          <Select
            mode="multiple"
            placeholder="Kişi seçiniz"
            value={currentSubtask ? currentSubtask.details.selectedUsers : []}
            onChange={(values) =>
              handleSubtaskDetailChange("selectedUsers", values)
            }
            style={{ width: "100%" }}
          >
            {firebaseUsers.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.first_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>

      {/* Mail Gönder Butonu */}
      <Form.Item>
        <Button type="primary" className="gonder" onClick={handleSendMail}>
          Görevleri Maille Gönder
        </Button>
      </Form.Item>
    </Card>
  );
};
export default Gorevler;
