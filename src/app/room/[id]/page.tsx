'use client'

import EstimateButtons from "@/components/ui/estimate-buttons";
import FullScrreenLoader from "@/components/ui/full-screen-loader";
import RoomHeader from "@/components/ui/room-header";
import StoryPointsBoard from "@/components/ui/story-points-board";
import { RoomData, useRealtimeDocumentListener } from "@/hooks/useRealtimeDocumentListener";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

// 1. Room creator - (has ID and display name)
// - Use id from localStorage and displayName from document. Open "share" dialog

// 2. Player has an existing ID, included in this room - (has ID and display name)
// - Use id from localStorage and displayName from document.

// 3. Player has an existing ID, not included in this room - (has ID, no display name)
// - Use id from localStorage. Prompt user for a displayName.

// 4. New player with no ID - (no ID, no display name)
// - Prompt user for a displayName. Generate and store new id in localStorage and in document. 

const DocumentContext = createContext<null | RoomData>(null);

export const useDocumentContext = () => useContext(DocumentContext);

export default function RoomPage({ params }: { params: { id: string } }) {
  const { document, error, loading } = useRealtimeDocumentListener(params.id)

  const router = useRouter()

  const playerId = localStorage.getItem("player_id")
  const currentPlayerId = playerId || createPlayerId()

  const existingPlayer = document?.players.find((player) => player.id === currentPlayerId)
  const isRoomCreator = existingPlayer?.roomCreator

  function createPlayerId() {
    const id = crypto.randomUUID()
    localStorage.setItem("player_id", id)
    return id
  }

  useEffect(() => {
    if (!loading && !existingPlayer) {
      router.replace(`/room/${params.id}/add-player`)
    }
  }, [existingPlayer, loading, params.id, router])

  if (loading || !document || !existingPlayer) {
    return (
      <>
        <RoomHeader />
        <FullScrreenLoader />
      </>
    )
  }

  return (
    <DocumentContext.Provider value={document}>
      <RoomHeader shareDialogOpen={isRoomCreator} />
      <section className="max-w-screen-xl mx-auto">
        <EstimateButtons currentPlayer={existingPlayer} roomId={params.id} />
        {error && <h1>There was a problem loading this room.</h1>}
      </section>

      <section className="py-12">
        <StoryPointsBoard roomId={params.id} />
      </section>
    </DocumentContext.Provider>
  )
}
