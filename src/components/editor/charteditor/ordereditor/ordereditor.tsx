import { useState } from 'react';
import ChartOrder from 'src/types/chartorder';
import './ordereditor.css';

interface OrderEditorComponentProps {
  sectionIds: string[] | undefined;
  order: ChartOrder | undefined;
  setOrder: (order: ChartOrder) => void;
}

export default function OrderEditorComponent(props: OrderEditorComponentProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<string | undefined>();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

  const order = props.order || [];

  function pop(index: number | undefined) {
    if (index !== undefined && index >= 0 && index < order.length) {
      order.splice(index, 1);
      props.setOrder(order);
      setSelectedIndex(undefined);
    }
  }

  function append(sectionId: string | undefined) {
    if (sectionId) {
      order.push(sectionId);
      props.setOrder(order);
    }
  }

  function moveUp(index: number | undefined) {
    if (index !== undefined && index > 0 && index < order.length) {
      const tmp = order[index];
      order[index] = order[index - 1];
      order[index - 1] = tmp;
      props.setOrder(order);
      setSelectedIndex(index - 1);
    }
  }

  function moveDown(index: number | undefined) {
    if (index !== undefined && index >= 0 && index < order.length - 1) {
      const tmp = order[index];
      order[index] = order[index + 1];
      order[index + 1] = tmp;
      props.setOrder(order);
      setSelectedIndex(index + 1);
    }
  }

  return (
    <div className="section-order-editor">
      <h2>Section Order:</h2>
      <div className="order-editor">
        <div className="flex-col">
          <h3>Sections:</h3>
          <div
            className={`order-editor-list flex-grow-1${props.sectionIds === undefined ? ' disabled' : ''}`}
          >
            {(props.sectionIds || []).map((sectionId) => (
              <div
                className={`order-editor-list-row${sectionId === selectedSectionId ? '-selected' : ''}`}
                key={sectionId}
                onClick={() => {
                  setSelectedSectionId(sectionId);
                  setSelectedIndex(undefined);
                }}
              >
                {sectionId}
              </div>
            ))}
          </div>
        </div>
        <div className="order-editor-button-col">
          <button
            className="square-button"
            disabled={selectedSectionId === undefined}
            onClick={() => append(selectedSectionId)}
          >
            &rarr;
          </button>
          <button
            className="square-button margin-bottom"
            disabled={selectedIndex === undefined}
            onClick={() => pop(selectedIndex)}
          >
            &larr;
          </button>
          <button
            className="square-button"
            disabled={selectedIndex === undefined}
            onClick={() => moveUp(selectedIndex)}
          >
            &uarr;
          </button>
          <button
            className="square-button"
            disabled={selectedIndex === undefined}
            onClick={() => moveDown(selectedIndex)}
          >
            &darr;
          </button>
        </div>
        <div className="flex-col">
          <h3>Order:</h3>
          <div
            className={`order-editor-list flex-grow-1${props.sectionIds === undefined ? ' disabled' : ''}`}
          >
            {(props.order || []).map((sectionId, index) => (
              <div
                className={`order-editor-list-row${index === selectedIndex ? '-selected' : ''}`}
                key={index}
                onClick={() => {
                  setSelectedSectionId(undefined);
                  setSelectedIndex(index);
                }}
              >
                {sectionId}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
