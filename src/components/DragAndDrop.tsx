import { ReactNode, useState, useCallback, useRef } from "react";

interface DragAndDropProps<T extends { id: string }> {
  items: T[];
  renderItem: (item: T, index: number, isDragging: boolean) => ReactNode;
  onDrop: (items: T[]) => void;
}

export const DragAndDrop = <T extends { id: string }>({
  items,
  renderItem,
  onDrop,
}: DragAndDropProps<T>) => {

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragItemRef = useRef<number | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    dragItemRef.current = Array.from(
      e.currentTarget.parentNode?.children || []
    ).indexOf(e.currentTarget);
    setDraggingId(id);
  }, []);

  const handleDragEnter = useCallback(
    (e: React.DragEvent, id: string) => {
      e.preventDefault();

      if (draggingId === id) return;

      const dragOverItemIndex = Array.from(
        e.currentTarget.parentNode?.children || []
      ).indexOf(e.currentTarget);

      dragItemRef.current = dragOverItemIndex;

      if (dragItemRef.current !== null) {
        const updatedItems = [...items];
        const draggedItemIndex = updatedItems.findIndex(
          (item) => item.id === draggingId
        );

        if (draggedItemIndex !== -1) {
          const [draggedItem] = updatedItems.splice(draggedItemIndex, 1);
          updatedItems.splice(dragOverItemIndex, 0, draggedItem);
          onDrop(updatedItems);
          dragItemRef.current = dragOverItemIndex;
        }
      }
    },
    [draggingId, items, onDrop]
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    dragItemRef.current = null;
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragEnter={(e) => handleDragEnter(e, item.id)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          className={`bg-white rounded-md  ${
            draggingId === item.id ? "opacity-50" : ""
          }`}
          style={{ height: "auto" }}>
          {renderItem(item, index, draggingId === item.id)}
        </div>
      ))}
    </>
  );
};
