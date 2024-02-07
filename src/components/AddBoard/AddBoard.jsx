import React from 'react'
import { useForm, useFieldArray } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { addNewBoard } from '../../reducers/dataSlice'
import { changeBoard } from '../../reducers/boardSlice'
import SvgComponent from '../SvgComponent'
import styles from './AddBoard.module.scss'

const AddBoard = ({ close }) => {
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'columns', keyName: 'id' });

  React.useEffect(() => {
    setValue('columns', [{name: 'Todo'}, {name: 'Doing'}]);
  }, [setValue]);

  const theme = useSelector((state) => state.theme)
  const indexBoard = useSelector((state) => state.board)
  const dispatch = useDispatch();

  const onSubmit = (data) => {
		dispatch(addNewBoard(data))
    indexBoard === null && dispatch(changeBoard(0))
    close()
	}

  return (
    <div className={styles.modal} onClick={close}>
      <section className={`${styles.modal_content} ${styles[theme]}`} onClick={(e) => e.stopPropagation()}>
        <h2 className={`${styles.title} ${styles[theme]}`}>Add New Board</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <label htmlFor="title" className={`${styles.label} ${styles[theme]}`}>Name
            <input type="text" id='title' {...register('name', {required: 'Can’t be empty'})} placeholder='e.g. Web Design'
              className={`${styles.input} ${styles[theme]} ${errors.name && styles.errorInput}`} />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </label>
          <div className={`${styles.label} ${styles[theme]}`}>Columns
            {fields.map((field, index) => (
              <label htmlFor={`column[${index}]`} key={field.id} className={styles.containerColumns}>
                <input id={`column[${index}]`} {...register(`columns[${index}].name`, {required : 'Can’t be empty'})} 
                  defaultValue={field.name || ''}  className={`${styles.input} ${styles[theme]} 
                  ${errors.columns && errors.columns[index] && errors.columns[index].name && styles.errorInput}`} 
                />
                {errors.columns && errors.columns[index] && errors.columns[index].name &&
                  <p className={styles.error}>{errors.columns[index].name.message}</p>
                }
                <button type="button" onClick={() => remove(index)} className={styles.delete}>
                  <SvgComponent path='/assets/icon-cross.svg' color='gray' colorHover='red' />
                </button>
              </label>
            ))}
            <button type="button" onClick={() => append({name: ''})} className={`${styles.buttonAdd} ${styles[theme]}`}>
              +Add New Column
            </button>
          </div>
          <input type="submit" value="Create New Board" className={styles.buttonCreate}/>
        </form>
      </section>
    </div>
  )
}

export default AddBoard