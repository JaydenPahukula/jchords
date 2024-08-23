import ChartLine from 'src/types/chartline';
import ChartSection from 'src/types/chartsection';
import ChartSectionType from 'src/types/chartsectiontype';
import { renderInlineLine, renderNormalLine } from 'src/utils/renderline';
import './chartsection.css';

interface ChartSectionComponentProps {
  section: ChartSection;
}

function renderLine(line: ChartLine, type: ChartSectionType): JSX.Element {
  if (type === ChartSectionType.Normal) {
    const [lyricLine, chordsLine] = renderNormalLine(line);
    return (
      <>
        <b key={chordsLine}>{chordsLine}</b>
        <p key={lyricLine}>{lyricLine}</p>
      </>
    );
  } else {
    const renderedLine = renderInlineLine(line);
    return <b key={renderedLine}>{renderedLine}</b>;
  }
}

export default function ChartSectionComponent(props: ChartSectionComponentProps) {
  return (
    <div className="chart-section">
      <h2 className="chart-section-header">{props.section.sectionname.toUpperCase()}</h2>
      {props.section.lines.map((line) => renderLine(line, props.section.type))}
    </div>
  );
}
