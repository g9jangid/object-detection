import React, { Component } from "react";
import styled from "@emotion/styled";
import useImage from "use-image";
import { Stage, Layer, Image, Rect, Circle, Group } from "react-konva";
import { useStrictMode } from "react-konva";
import { connect } from "react-redux";
import { RECTMENU, LINEMENU } from "../../constants";
import ACTIONS from "../../modules/actions";
import PropTypes from "prop-types";

useStrictMode(true);

const EditorImage = ({ width, height }) => {
  const [image] = useImage(
    "https://www.androidguys.com/wp-content/uploads/2015/11/milky_way_sky-wide.jpg"
  );
  return (
    <Image
      id="sourceImage"
      image={image}
      x={0}
      y={0}
      width={width}
      height={height}
    />
  );
};

const StyledSection = styled.section`
  width: 90%;
  height: calc(80vh - 60px);
  margin-top: calc(10vh);
  margin-left: 5%;
  background: transparent;
`;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.editorWrapper = React.createRef();
    this.state = {
      canvasBoundries: {},
      isLoadedWithBoundries: false,
      isDrawing: false,
      currentPoints: {},
      virtualRect: { x: 0, y: 0, width: 0, height: 0 },
      isDragging: false,
      threePoints: { x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 },
      pointsCount: 0
    };
  }

  componentDidMount = () => {
    const editorBoundries = this.editorWrapper.current.getBoundingClientRect();
    if (!this.state.isLoadedWithBoundries) {
      this.setState({
        canvasBoundries: {
          height: editorBoundries.height,
          width: editorBoundries.width,
          x: editorBoundries.x,
          y: editorBoundries.y
        },
        isLoadedWithBoundries: true
      });
    }
  };

  handleMouseDown = e => {
    if (this.props.menus === RECTMENU) {
      if (e.target.attrs.id === "sourceImage") {
        this.setState({
          isDrawing: true,
          currentPoints: { x: e.evt.x, y: e.evt.y }
        });
      }
    }
  };

  handleMouseUp = e => {
    if (this.props.menus === RECTMENU) {
      if (this.state.isDrawing) {
        this.props.setArea({
          x: this.state.currentPoints.x - this.state.canvasBoundries.x,
          y: this.state.currentPoints.y - this.state.canvasBoundries.y,
          width: e.evt.x - this.state.currentPoints.x,
          height: e.evt.y - this.state.currentPoints.y,
          isVisible: true
        });

        this.setState({
          virtualRect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          },
          isDrawing: false
        });
      }
    }
  };

  handleMouseMove = e => {
    if (this.props.menus === RECTMENU) {
      if (this.state.isDrawing) {
        this.setState({
          virtualRect: {
            x: this.state.currentPoints.x - this.state.canvasBoundries.x,
            y: this.state.currentPoints.y - this.state.canvasBoundries.y,
            width: e.evt.x - this.state.currentPoints.x,
            height: e.evt.y - this.state.currentPoints.y
          }
        });
      }
    }
  };

  handleMouseClick = e => {
    if (this.props.menus === LINEMENU) {
      if (this.state.pointsCount === 0) {
        this.setState({
          pointsCount: 1,
          threePoints: { ...this.state.threePoints, x1: e.evt.x, y1: e.evt.y }
        });
      } else if (this.state.pointsCount === 1) {
        this.setState({
          pointsCount: 2,
          threePoints: { ...this.state.threePoints, x2: e.evt.x, y2: e.evt.y }
        });
      } else if (this.state.pointsCount === 2) {
        this.setState({
          pointsCount: 3,
          threePoints: { ...this.state.threePoints, x3: e.evt.x, y3: e.evt.y }
        });

        let x = Math.min(
          this.state.threePoints.x1,
          this.state.threePoints.x2,
          this.state.threePoints.x3
        );
        let width = Math.max(
          this.state.threePoints.x1,
          this.state.threePoints.x2,
          this.state.threePoints.x3
        );
        let y = Math.min(
          this.state.threePoints.y1,
          this.state.threePoints.y2,
          this.state.threePoints.y3
        );
        let height = Math.max(
          this.state.threePoints.y1,
          this.state.threePoints.y2,
          this.state.threePoints.y3
        );

        this.props.setArea({
          x: x - this.state.canvasBoundries.x,
          y: y - this.state.canvasBoundries.y,
          width: width - x,
          height: height - y,
          isVisible: true
        });

        this.setState({
          pointsCount: 0,
          threePoints: { x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 }
        });
      }
    }
  };

  handleOnDragEnd = () => {
    this.setState({
      isDragging: false
    });
  };

  render() {
    return (
      <StyledSection id="editorWrapper" ref={this.editorWrapper}>
        <Stage
          height={this.state.canvasBoundries.height}
          width={this.state.canvasBoundries.width}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onClick={this.handleMouseClick}
        >
          <Layer>
            <EditorImage
              height={this.state.canvasBoundries.height}
              width={this.state.canvasBoundries.width}
            />
          </Layer>
          <Layer>
            <Rect
              x={this.state.virtualRect.x}
              y={this.state.virtualRect.y}
              width={this.state.virtualRect.width}
              height={this.state.virtualRect.height}
              stroke="#3ed67e"
              strokeWidth={1}
              lineJoin="round"
              dash={[5, 3]}
            />
          </Layer>

          <Layer>
            {this.props.selectedAreas.map(
              (rect, i) =>
                rect.isVisible && (
                  <Group
                    key={i}
                    draggable
                    onDragStart={() => {
                      this.setState({
                        isDragging: true
                      });
                    }}
                    onDragEnd={() => this.handleOnDragEnd()}
                  >
                    <Rect
                      x={rect.x - 4}
                      y={rect.y - 4}
                      width={8}
                      height={8}
                      fill="#3ed67e"
                    />
                    <Rect
                      x={rect.width + rect.x - 4}
                      y={rect.y - 4}
                      width={8}
                      height={8}
                      fill="#3ed67e"
                    />
                    <Rect
                      x={rect.x - 4}
                      y={rect.height + rect.y - 4}
                      width={8}
                      height={8}
                      fill="#3ed67e"
                    />
                    <Rect
                      x={rect.width + rect.x - 4}
                      y={rect.height + rect.y - 4}
                      width={8}
                      height={8}
                      fill="#3ed67e"
                    />
                    <Rect
                      key={i}
                      x={rect.x}
                      y={rect.y}
                      width={rect.width}
                      height={rect.height}
                      stroke="#3ed67e"
                      strokeWidth={1}
                      lineJoin="round"
                      lineCap="square"
                      dash={[5, 3]}
                    />
                  </Group>
                )
            )}
          </Layer>
          <Layer>
            {this.state.pointsCount >= 1 && (
              <Circle
                x={this.state.threePoints.x1 - this.state.canvasBoundries.x}
                y={this.state.threePoints.y1 - this.state.canvasBoundries.y}
                radius={3}
                fill="#3ed67e"
              />
            )}
            {this.state.pointsCount >= 2 && (
              <Circle
                x={this.state.threePoints.x2 - this.state.canvasBoundries.x}
                y={this.state.threePoints.y2 - this.state.canvasBoundries.y}
                radius={3}
                fill="#3ed67e"
              />
            )}
            {this.state.pointsCount === 3 && (
              <Circle
                x={this.state.threePoints.x3 - this.state.canvasBoundries.x}
                y={this.state.threePoints.y3 - this.state.canvasBoundries.y}
                radius={3}
                fill="#3ed67e"
              />
            )}
          </Layer>
        </Stage>
      </StyledSection>
    );
  }
}

Editor.propTypes = {
  menus: PropTypes.string,
  selectedAreas: PropTypes.array,
  setArea: PropTypes.func
};

export default connect(
  ({ menus, selectedAreas }) => ({
    menus,
    selectedAreas
  }),
  { setArea: ACTIONS.setArea }
)(Editor);
