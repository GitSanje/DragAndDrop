import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";
import { Home, NoMatch } from "@/pages";
import DragDrop from "@/pages/DnD/DragDrop";
import Sortable from "@/pages/DnD/Sortable/Sortable";
import KanBanBoard from "@/pages/DnD/Kanaban/KanBanBoard";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/dnd" element={ <DragDrop/>} />
          <Route path="/dndsortable" element={ <Sortable/>} />
          <Route path="/kanban" element={ <KanBanBoard/>} />
         
          
        </Route>
      </Routes>
    </>
  );
};

export default App;
