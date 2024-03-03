// // // // // // // // // // // // // // // 
// // GET REALTIME FIRESTORE DOCUMENTS // //
// // // // // // // // // // // // // // // 

import { useEffect, useState } from "react";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from "@/lib/firebase/config";

export type Player = {
  name: string
  id: string
  roomCreator?: boolean
  points?: string
}

export type RoomData = {
  timestamp: any
  scoresHidden: boolean
  players: Player[]
}

export const useRealtimeDocumentListener = (documentId: string) => {
  const [document, setDocument] = useState<RoomData | null>(null);
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "rooms", documentId),
      (snapshot) => {
        const result = snapshot.data() as RoomData | undefined;
        if (result) {
          setDocument(result);
        } else {
          setError('Something went wrong')
        }
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching document: ", error)
        setError(error)
        setLoading(false)
      }
    );

    return () => unsubscribe();
  }, [documentId]);

  return { document, error, loading }
};
