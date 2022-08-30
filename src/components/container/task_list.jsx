import React, { useState, useEffect } from 'react';
import { LEVELS } from '../../models/levels.enum';
import { Task } from '../../models/task.class';
import TaskComponent from '../pure/task';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Importamos la hoja de estilos de task.scss
import '../../styles/task.scss';

const TaskListComponent = () => {
    const defaultTask1 = new Task('Example 1', 'Description 1', true, LEVELS.NORMAL);
    const defaultTask2 = new Task('Example 2', 'Description 2', false, LEVELS.URGENT);
    const defaultTask3 = new Task('Example 3', 'Description 3', false, LEVELS.BLOCKING);

    // Estado del componente
    const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);

    // Control del ciclo de vida del componente
    useEffect(() => {
        console.log('Task State has been modified');
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => {
            console.log('TaskList component is going to unmount');
        };
    }, [tasks]);

    function completeTask(task) {
        console.log('Complete this task:', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks[index].completed = !tempTasks[index].completed;
        // Actualizamos el estado del componente
        setTasks(tempTasks);
    }

    function deleteTask(task) {
        console.log('Delete this task:', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks.splice(index, 1);
        // Actualizamos el estado del componente
        setTasks(tempTasks);
    }

    const Table = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => {
                        return(
                            <TaskComponent
                                key={index}
                                task={task}
                                complete={completeTask}
                                remove={deleteTask}
                            >
                            </TaskComponent>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    let tasksTable;
    if(tasks.length > 0) {
        tasksTable = <Table></Table>
    } else {
        tasksTable = (
            <div>
                <h3>There are no tasks to show</h3>
                <p>Add a new task</p>
            </div>
        )
    }

    const loadingStyle = {
        color: 'grey',
        fontSize: '30px',
        fontWeight: 'bold'
    }

    const initialValues = {
        name: '',
        description: '',
        completed: false,
        level: LEVELS.NORMAL
    }

    const taskSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
    });

    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                    {/* Card Header (title) */}
                    <div className='card-header p-3'>
                        <h5>Your tasks:</h5>
                    </div>

                    {/* Formulario para añadir una nueva tarea */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={taskSchema}
                        onSubmit = {async (values) => {
                            console.log('Add this task:', values);
                            const tempTasks = [...tasks];
                            tempTasks.push(values);
                            // Actualizamos el estado del componente
                            setTasks(tempTasks);
                        }}
                    >
                        {({
                            touched,
                            errors,
                            isSubmitting,
                        }) => (
                            <Form>
                                <label htmlFor="name">Name</label>
                                <Field id="name" name="name" placeholder="Your Task Name" type="text"/>
                                {
                                    errors.name && touched.name && (
                                        <ErrorMessage name="name" component='div' />
                                    )
                                }

                                <label htmlFor="description">Description</label>
                                <Field id="description" name="description" placeholder="Your Description" type="text"/>
                                {
                                    errors.description && touched.description && (
                                        <ErrorMessage name="description" component='div' />
                                    )
                                }

                                <label htmlFor="level">Level</label>
                                <Field id="level" name="level" as="select">
                                    <option value={LEVELS.NORMAL}>Normal</option>
                                    <option value={LEVELS.URGENT}>Urgent</option>
                                    <option value={LEVELS.BLOCKING}>Blocking</option>
                                </Field>

                                <button type="submit">Add New Task</button>
                            </Form>
                        )}
                    </Formik>

                    {/* Card Body (content) */}
                    <div className='card-body' data-mdb-perfect-scrollbar='true' style={{position: 'relative', height: '400px'}}>
                        {/* TODO: Add loading spinner */}
                        {loading ? (<p style={loadingStyle}>Loading tasks</p>) : tasksTable}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TaskListComponent;
