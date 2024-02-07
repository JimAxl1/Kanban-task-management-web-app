import React from 'react'
import { useForm, useFieldArray } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { editBoard } from '../../reducers/dataSlice'
import SvgComponent from '../SvgComponent'
import styles from './EditBoard.module.scss'

const EditBoard = ({ close }) => {
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm()
  const { fields, append, remove } = useFieldArray({ control, name: 'columns', keyName: 'id' });

  const dispatch = useDispatch();
  const indexBoard = useSelector((state) => state.board)
  const data = useSelector((state) => state.data)
  const theme = useSelector((state) => state.theme)

  React.useEffect(() => {
    const columns = data[indexBoard].columns.map((item, index) => {
      return {name: item.name, index: index}
    })
    setValue('columns', columns);
    register("indexBoard", { value: indexBoard })
  }, [setValue]);

  const onSubmit = (data) => {
		dispatch(editBoard(data))
    close()
	}

  return (
    <div className={styles.modal} onClick={close}>
      <section className={`${styles.modal_content} ${styles[theme]}`} onClick={(e) => e.stopPropagation()}>
        <h2 className={`${styles.title} ${styles[theme]}`}>Edit Board</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <label htmlFor="title" className={`${styles.label} ${styles[theme]}`}>Name
            <input type="text" id='title' {...register('name', {required: 'Can’t be empty', value: data[indexBoard].name})} className={`${styles.input} ${styles[theme]} ${errors.name && styles.errorInput}`} />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </label>
          <div htmlFor="" className={`${styles.label} ${styles[theme]}`}>Columns
            {fields.map((field, index) => (
              <label htmlFor={`column[${index}]`} key={field.id} className={styles.containerColumns}>
                <input id={`column[${index}]`} {...register(`columns[${index}].name`, {required : 'Can’t be empty'})} className={`${styles.input} ${styles[theme]} 
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
          </div>
          <button onClick={() => append({name: '', index: null})} className={`${styles.buttonAdd} ${styles[theme]}`}>+Add New Column</button>
          <input type='submit' value='Save Changes' className={styles.buttonCreate}/>
        </form>
      </section>
    </div>
  )
}

export default EditBoard