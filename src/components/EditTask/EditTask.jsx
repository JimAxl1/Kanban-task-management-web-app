import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { editTask } from '../../reducers/dataSlice'
import SvgComponent from '../SvgComponent'
import styles from './EditTask.module.scss'

const EditTask = ({ close, task, infoRoute }) => {
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm()
  const { fields, append, remove } = useFieldArray({ control, name: 'subtasks', keyName: 'id' });
  
  const data = useSelector((state) => state.data)
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const options = data[infoRoute.indexBoard].columns.map((item) => {
    return item.name
  })

  React.useEffect(() => {
    const me = data[infoRoute.indexBoard].columns[infoRoute.indexColumn].tasks[infoRoute.indexTask].subtasks.map((item, index) => {
      return {title: item.title, isCompleted: item.isCompleted}
    })
    setValue('subtasks', me);
    register("indexBoard", { value: infoRoute.indexBoard })
    register('indexColumn', { value: infoRoute.indexColumn})
    register('indexTask', { value: infoRoute.indexTask })
  }, [setValue]);

  const onSubmit = (info) => {
    dispatch(editTask(info))
    close()
  }

  return (
    <div className={styles.modal} onClick={close}>
      <form className={`${styles.modal_content} ${styles[theme]}`} onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation(e)}>
        <h2 className={`${styles.title} ${styles[theme]}`}>Edit Task</h2>
        <label htmlFor="title" className={`${styles.label} ${styles[theme]}`}>Title
          <input type="text" id='title' placeholder='e.g. Take coffee break' className={`${styles.input} ${styles[theme]} ${errors?.title && styles.errorInput}`}
            {...register('title', {required: 'Can’t be empty', value: task.title})}
          />
          {errors?.title && <p className={styles.error}>{errors?.title.message}</p>}
        </label>
        <label htmlFor="description" className={`${styles.label} ${styles[theme]}`}>Description
          <textarea type="text" id="description" placeholder='e.g. It’s always good to take a break. This 
            15 minute break will  recharge the batteries a little.' className={`${styles.input} ${styles.textarea} ${styles[theme]}`}
            {...register('description', { value: task.description })}
          />
        </label>
        <div htmlFor="" className={`${styles.label} ${styles[theme]}`}>Subtasks
          {fields.map((field, index) => (
            <label htmlFor={`subtask[${index}]`} key={field.id} className={styles.inputContainer}>
              <input id={`subtask[${index}]`} {...register(`subtasks[${index}].title`, {required : 'Can’t be empty'})} 
                placeholder={index % 2 === 1 ? 'e.g. Make coffee': 'e.g. Drink coffee & smile'} className={`${styles.input} ${styles[theme]} 
                ${errors.subtasks && errors.subtasks[index] && errors.subtasks[index].title && styles.errorInput}`} 
              />
              {errors.subtasks && errors.subtasks[index] && errors.subtasks[index].title &&
                <p className={styles.error}>{errors.subtasks[index].title.message}</p>
              }
              <button type="button" onClick={() => remove(index)} className={styles.delete}>
                <SvgComponent path='/assets/icon-cross.svg' color='gray' colorHover='red' />
              </button>
            </label>
          ))}
        </div>
        <button onClick={() => append({title: '', isCompleted: false})} className={`${styles.addSubtask} ${styles[theme]}`}>+ Add New Subtask</button>
        <label htmlFor="status" className={`${styles.label} ${styles[theme]}`}>Status
          <select id="status" {...register('status')} defaultValue={infoRoute.indexColumn} className={`${styles.select} ${styles[theme]}`}>
            {options.map((item, index) => {
              return <option key={index} value={index} className={`${styles.option} ${styles[theme]}`}>{item}</option>
            })}
          </select>
        </label>
        <input type="submit" value="Save Changes" className={styles.buttonSave} />
      </form>  
    </div>
  )
}

export default EditTask