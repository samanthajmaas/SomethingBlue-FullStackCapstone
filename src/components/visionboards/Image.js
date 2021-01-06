import React, { useContext, useState} from "react"
import { VisionBoardContext } from "./VisionBoardProvider";

export const VBImage = (props) => {
    const {deleteImage} = useContext(VisionBoardContext)
    const [isShown, setIsShown] = useState(false);

    return (
        <>
            <section className="vb-image">
                    <> {
                        isShown ? 
                        <button className="btn x vs-delete" 
                        onMouseEnter={() => setIsShown(true)}
                        onClick={() => deleteImage(props.image)}>X
                        </button> :
                        null
                        }
                        
                        <div>
                            <div className="vb-img">{props.image.vb_image}</div>
                            <img className="image vb-img" 
                            onMouseEnter={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}
                            style={{height: "20em"}} alt="" src={props.image.vb_img}/>
                        </div>
                    </>
            </section>
        </>
    )
}