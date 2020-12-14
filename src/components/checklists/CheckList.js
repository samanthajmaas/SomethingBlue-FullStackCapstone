import React from "react"

export const Checklist = (props) => {
    const { checklistItems, getChecklist } = useContext(CategoryContext)
    
    useEffect(() => {
        getChecklist()
    }, [])

    // const [editMode, setEditMode] = useState(false)
    // const [currentCategory, setCurrentCategory] = useState({})

    return (
        <>
            <div className="cat-list-cont">
                <section className="categories">
                <h2>Categories</h2>
                    {categories.map(c => {
                        return <Category
                            key={c.id}
                            category={c}
                            setEditMode={setEditMode}
                            setCurrentCategory={setCurrentCategory}
                            {...props} />
                    }).reverse()
                    }
                </section>
                <div>
                    {editMode
                        ? <EditCategoryForm
                            setCurrentCategory={setCurrentCategory}
                            currentCategory={currentCategory}
                            setEditMode={setEditMode}
                            {...props} />
                        : null}
                </div>
                <section>
                    <CategoryForm {...props} />
                </section>
            </div>
        </>
    )
}