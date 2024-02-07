import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { addNewTask } from '../../reducers/dataSlice'
import SvgComponent from '../SvgComponent'
import styles from './AddTask.module.scss'

const AddTask = ({ close }) => {
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm()
  const { fields, append, remove } = useFieldArray({ control, name: 'subtasks', keyName: 'id' });

  const theme = useSelector((state) => state.theme)
  const indexBoard = useSelector((state) => state.board)
  const allBoards = useSelector((state) => state.data)
  const dispatch = useDispatch()

  React.useEffect(() => {
    setValue('subtasks', [{name: ''}, {name: ''}]);
    register("indexBoard", { value: indexBoard })
  }, [setValue]);

  const onSubmit = (data) => {
    dispatch(addNewTask(data))
    close()
  }

  return (
    <div className={styles.modal} onClick={close}>
      <form className={`${styles.modal_content} ${styles[theme]}`} onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation(e)}>
        <h2 className={`${styles.title} ${styles[theme]}`}>Add New Task</h2>
        <label htmlFor="title" className={`${styles.label} ${styles[theme]}`}>Title
          <input type="text" id='title' placeholder='e.g. Take coffee break' {...register('title', {required: 'Can’t be empty'})}
           className={`${styles.input} ${styles[theme]} ${errors?.title && styles.errorInput}`}
          />
          {errors?.title && <p className={styles.error}>{errors?.title.message}</p>}
        </label>
        <label htmlFor="description" className={`${styles.label} ${styles[theme]}`}>Description
          <textarea id='description' placeholder='e.g. It’s always good to take a break. This 
            15 minute break will  recharge the batteries a little.' {...register('description')}
            className={`${styles.input} ${styles[theme]} ${styles.textarea}`}
          />
        </label>
        <div className={`${styles.label} ${styles[theme]}`}>Subtasks
          {fields.map((field, index) => (
            <label htmlFor={`subtask[${index}]`} key={field.id} className={styles.inputContainer}>
              <input id={`subtask[${index}]`} {...register(`subtasks[${index}].name`, {required : 'Can’t be empty'})} 
                placeholder={index % 2 === 1 ? 'e.g. Make coffee': 'e.g. Drink coffee & smile'} className={`${styles.input} ${styles[theme]} 
                ${errors.subtasks && errors.subtasks[index] && errors.subtasks[index].name && styles.errorInput}`} 
              />
              {errors.subtasks && errors.subtasks[index] && errors.subtasks[index].name &&
                <p className={styles.error}>{errors.subtasks[index].name.message}</p>
              }
              <button type="button" onClick={() => remove(index)} className={styles.delete}>
                <SvgComponent path='/assets/icon-cross.svg' color='gray' colorHover='red' />
              </button>
            </label>
          ))}
        </div>
        <button onClick={() => append({name: ''})} className={`${styles.addSubtask} ${styles[theme]}`}>+ Add New Subtask</button>
        <label htmlFor="status" className={`${styles.label} ${styles[theme]}`}>Status
          <select id="status" {...register('indexStatus')} className={`${styles.select} ${styles[theme]}`}>
            {allBoards[indexBoard].columns.map((item, index) => {
              return <option key={index} value={index} className={`${styles.option} ${styles[theme]}`}>{item.name}</option>
            })}
          </select>
        </label>
        <input type="submit" value="Create Task" className={styles.buttonSave} />
      </form>  
    </div>
  )
}

export default AddTask