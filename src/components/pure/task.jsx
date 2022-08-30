// rfc
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Models
import { Task } from '../../models/task.class';
import { LEVELS } from '../../models/levels.enum';

// Importamos la hoja de estilos de task.scss
import '../../styles/task.scss';

const TaskComponent = ({ task, complete, remove }) => {
    useEffect(() => {
        console.log('Task created');
        return () => {
            console.log(`Task ${task.name} is going to unmount`);
        };
    }, [task]);

    /**
     * Función que retorna un Badge
     * dependiendo del nivel de la tarea
     */
    function taskLevelBadge() {
        switch (task.level) {
            case LEVELS.NORMAL:
                return(<h6 className='mb-0'><span className='badge bg-primary'>{task.level}</span></h6>)
            case LEVELS.URGENT:
                return(<h6 className='mb-0'><span className='badge bg-warning'>{task.level}</span></h6>)
            case LEVELS.BLOCKING:
                return(<h6 className='mb-0'><span className='badge bg-danger'>{task.level}</span></h6>)
            default:
                break;
        }
    }

    /**
     * Función que retorna un icono dependiendo del estado de la tarea 
     */
    function taskCompletedIcon() {
        if (task.completed) {
            return(<i onClick={() => complete(task)} className='bi-toggle-on task-action' style={{color: 'green'}}></i>);
        } else {
            return(<i onClick={() => complete(task)} className='bi-toggle-off task-action' style={{color: 'grey'}}></i>);
        }
    }
    
    return (
        <tr className={task.completed ? 'task-completed fw-normal' : 'task-pending fw-normal'}>
            <th>
                <span className='ms-2'>{task.name}</span>
            </th>
            <td className='align-middle'>
                <span>{task.description}</span>
            </td>
            <td className='align-middle'>
                {/* Execución de la función que retorna el badge element */}
                {taskLevelBadge()}
            </td>
            <td className='align-middle'>
                {/* {task.completed ? (<i className='bi-toggle-on' style={{color: 'green'}}></i>) : (<i className='bi-toggle-off' style={{color: 'grey'}}></i>)} */}
                {/* Cambiamos el código de la línea anterior por la correspondiente función */}
                {taskCompletedIcon()}

                <i className='bi-trash task-action' onClick={() => remove(task)} style={{color: 'tomato'}}></i>

                {/* <span>{task.completed ? 'Completed' : 'Pending'}</span> */}
            </td>
        </tr>
    );
};


TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};


export default TaskComponent;
