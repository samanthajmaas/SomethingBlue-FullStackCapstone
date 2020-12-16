import React, { useContext} from "react"
import { VisionBoardContext } from "./VisionBoardProvider";

export const VBImage = (props) => {
    const {deleteImage} = useContext(VisionBoardContext)

    return (
        <>
            <section className="vb-image">
                    <>
                    {/* {
                        props.editMode ? 
                    
                        <button className="btn-small fa fa-trash" onClick={() => deleteChecklistItem(props.item)}>X
                        </button> :
                        null
                    } */}
                        <div>
                            <div className="vb-img">{props.image.vb_image}</div>
                            <img className="image" style={{height: "20em"}} alt="" src={props.image.vb_img}/>
                        </div>
                    </>
            </section>
        </>
    )
}