import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    // 1. same board movement
    console.log(info);
    if (destination?.droppableId === source.droppableId) {
      setTodos((oldToDos) => {
        const boardCopy = [...oldToDos[source.droppableId]];
        boardCopy.splice(source?.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        console.log(oldToDos);
        return {
          ...oldToDos,
          [source.droppableId]: boardCopy,
        };
      });
      return;
    }
    if (!destination) return;
    setTodos((oldToDos) => {
      const sourceBoard = [...oldToDos[source.droppableId]];
      const targetBoard = [...oldToDos[destination?.droppableId]];
      sourceBoard.splice(source.index, 1);
      targetBoard.splice(destination?.index, 0, draggableId);
      return {
        ...oldToDos,
        [source.droppableId]: sourceBoard,
        [destination.droppableId]: targetBoard,
      };
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
