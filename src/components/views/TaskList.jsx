import { DeleteOutlined } from "@ant-design/icons";
import { Input, Button, Checkbox, List, Col, Row, Space, Divider } from "antd";
import produce from "immer";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function TaskList() {
    const [tasks, setTasks] = useState([
        {id: 1, title: "Task 1", marked_as_done: false},
        {id: 2, title: "Task 2", marked_as_done: false},
    ]);

    const handletitleChange = (task, event) => {
        const newTasks = produce(tasks, draft => {
            const index = draft.findIndex(t => t.id === task.id);
            draft[index].title = event.target.value;

            if(event.target.value != ""){
                axios.put(`http://demo2.z-bit.ee/tasks/${task.id}`,
                {
                    "title": event.target.value,
                },
                {
                    headers: {
                        Authorization: `Bearer bo9NtCOuX4jaWSqhjM37dmZwwH-vv6zo`
                    }
                })
                .then((response) => {
                    const ex = response.data;
                });
            } else {
                axios.put(`http://demo2.z-bit.ee/tasks/${task.id}`,
                {
                    "title": "ඞ",
                },
                {
                    headers: {
                        Authorization: `Bearer bo9NtCOuX4jaWSqhjM37dmZwwH-vv6zo`
                    }
                })
                .then((response) => {
                    const ex = response.data;
                });
            } 

        });
        setTasks(newTasks);
    
 
    };
    const handlemarked_as_doneChange = (task, event) => {
        const newTasks = produce(tasks, draft => {
            const index = draft.findIndex(t => t.id === task.id);
            draft[index].marked_as_done = event.target.checked;

            axios.put(`http://demo2.z-bit.ee/tasks/${task.id}`,
            {
                "marked_as_done": event.target.checked,
            },
            {
                headers: {
                    Authorization: `Bearer bo9NtCOuX4jaWSqhjM37dmZwwH-vv6zo`
                }
            })
            .then((response) => {
                const ex = response.data;
            });

        });
        setTasks(newTasks);
    };

    const handleAddTask = () => {
        setTasks(produce(tasks, draft => {

            axios.post(`http://demo2.z-bit.ee/tasks`,
            {
                "title": "New task",
                "marked_as_done": false
            },
            {
                headers: {
                    Authorization: `Bearer bo9NtCOuX4jaWSqhjM37dmZwwH-vv6zo`
                }
            })
            .then((response) => {
                const ex = response.data;
                console.log(ex)
    
            });
            draft.push({
                id: 5,
                title: "New task",
                marked_as_done: false
            });
        }));
    };

    const handleDeleteTask = (task) => {
        setTasks(produce(tasks, draft => {
            const index = draft.findIndex(t => t.id === task.id);
            draft.splice(index, 1);

            axios.delete(`http://demo2.z-bit.ee/tasks/${task.id}`,
            {
                headers: {
                    Authorization: `Bearer bo9NtCOuX4jaWSqhjM37dmZwwH-vv6zo`
                }
            })
            .then((response) => {
                const ex = response.data;
            });
        }));
    };

    useEffect(() => {
        axios.get('http://demo2.z-bit.ee/tasks', 
        {  headers: { Authorization: `Bearer bo9NtCOuX4jaWSqhjM37dmZwwH-vv6zo` }
        })
        .then((response) => {
            const ex = response.data;
            setTasks(ex);
         });
      }, [handleAddTask]);

    return (
        <Row type="flex" justify="center" style={{minHeight: '100vh', marginTop: '6rem'}}>
            <Col span={12}>
                <h1>Task List</h1>
                <Button onClick={handleAddTask}>Add Task</Button>
                <Divider />
                <List
                    size="small"
                    bordered
                    dataSource={tasks}
                    renderItem={(task) => <List.Item key={task.id}>
                        <Row type="flex" justify="space-between" align="middle" style={{width: '100%'}}>
                            <Space>
                                <Checkbox checked={task.marked_as_done} onChange={(e) => handlemarked_as_doneChange(task, e)} />
                                <Input value={task.title} onChange={(event) => handletitleChange(task, event)} />
                            </Space>
                            <Button type="text" onClick={() => handleDeleteTask(task)}><DeleteOutlined /></Button>
                        </Row>
                    </List.Item>}
                />
            </Col>
        </Row>
    )
}