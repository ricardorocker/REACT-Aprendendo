import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
};

const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "DELETED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const deleteDocument = async (docId) => {
        checkCancelBeforeDispatch({ type: "LOADING" });

        try {
            const deletedDoc = await deleteDoc(doc(db, docCollection, docId));

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDoc,
            });
        } catch (error) {
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
        }
    };

    useEffect(() => {
        return () => setCancelled(false);
    }, []);

    return { deleteDocument, response };
};
