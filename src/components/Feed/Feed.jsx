import {
  CalendarViewDay,
  Create,
  EventNote,
  Image,
  Subscriptions,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import InputOption from "../InputOption/InputOption";
import Post from "../Post/Post";
import "./Feed.css";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";

const Feed = () => {
  const inputRef = useRef(null);

  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    let form = inputRef.current;

    db.collection("posts").add({
      name: user?.displayName,
      description: user?.email,
      message: form["input"].value,
      photoUrl: user?.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    form["input"].value = "";
  };
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <Create />
          <form ref={inputRef}>
            <input type="text" name="input" />
            <button type="submit" onClick={sendPost}>
              send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption title="Photo" Icon={Image} color="#70B5F9" />
          <InputOption title="Video" Icon={Subscriptions} color="#E7A33E" />
          <InputOption title="Event" Icon={EventNote} color="#C0CBCD" />
          <InputOption
            title="Write article"
            Icon={CalendarViewDay}
            color="#7FC15E"
          />
        </div>
      </div>
      <FlipMove>
        {posts?.map(
          ({ id, data: { name, description, message, photoUrl } }) => (
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl}
            />
          )
        )}
      </FlipMove>
    </div>
  );
};

export default Feed;
