import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Button, Image, Row} from "react-bootstrap";
import {COLLECTIONS_ROUTE} from "../util/constants";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {delLike, getLikes, like} from "../http/likeAPI";
import likePic from "../assets/like.png"
import redLikePic from "../assets/redLike.png"

const OneCollection = ({collection, deleteCollections, id}) => {
    console.log(collection.id)
    const {user} = useContext(Context);

    const navigate = useNavigate();
    const [likes, setLikes] = useState([]);

    const getLike = async()=>{
        setLikes(await getLikes(collection.id));
    }
    useMemo(getLike, [collection]);
    const likedBool = Boolean(likes.find(x => x.userId === user.user.id));


    const [liked, setLiked] = useState(likedBool);
    useEffect(() => { setLiked(likedBool)}, [likedBool] )



    const [pic, setPic] = useState(liked?redLikePic:likePic);

     useEffect(() => { setPic(liked?redLikePic:likePic)}, [liked] )

    const setLikedAll = async () => {
        if(!liked){
            await like(collection.id, user.user.id);
            setPic(redLikePic);
        }else {
            console.log(collection.id + " " + user.user.id)
            await delLike(collection.id, user.user.id);
            setPic(likePic);
            console.log("deleted")
        }
        setLiked(!liked);

        await getLike();
    }
    return (
        <Row>
            <div>


                {collection.private?
                    (Number(id) === Number(user.user.id))?
                    <div className="d-grid gap-2">
                        <hr style={{color: "black", height: 2}}/>
                        <Button variant="outline-dark" onClick={() => navigate(COLLECTIONS_ROUTE+`/${collection.id}`)}>{collection.name}</Button>
                        <div className="d-flex justify-content-end">
                            <div style={{color: "grey"}}>
                                private
                            </div>
                        </div>
                        <p>{collection.description}</p>
                    </div>:null:
                    <div className="d-grid gap-2">
                        <hr style={{color: "black", height: 2}}/>
                        <Button variant="secondary" onClick={() => navigate(COLLECTIONS_ROUTE+`/${collection.id}`)}>{collection.name}</Button>
                        <p>{collection.description}</p>
                        <div className="d-flex align-content-between">
                            <p>{likes.length}</p>
                            {user.isAuth?
                                <Image className="m-1" src={pic} width={15} height={15} onClick={() => setLikedAll(!liked)}/>:
                                <Image className="m-1" src={likePic} width={15} height={15} onClick={() => alert("Log in to like!")}/>
                            }
                        </div>
                    </div>
                }



            </div>
                {(Number(id) === Number(user.user.id))?
                    <div>
                        <Button className="float-end p-lg-0" variant="link" style={{color: "red"}} size="sm" onClick={ () =>deleteCollections(collection.id)}>delete collection</Button>
                        <br/>
                    </div>:null}

        </Row>

    );
};

export default OneCollection;