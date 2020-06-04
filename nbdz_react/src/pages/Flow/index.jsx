import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { x6 } from '@antv/x6';
import { Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import {
  AutoScrollBox,
  colorPicker,
  contextMenu,
  dropdown,
  icon,
  Menu,
  menubar,
  scrollBox,
  scrollbar,
  splitBox,
  toolbar,
} from '@antv/x6-components';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;
class Flow extends React.Component {
  state = {
    graph: null,
    container: null,
  };
  componentDidMount() {
    const _this = this;
    if (!_this.refs.container) {
      return false;
    }
    // this.setState(
    //   {
    //     container: _this.refs.container,
    //   },
    //   () => {
    //     let { graph, container } = _this.state;
    //     graph = x6.render(container, {
    //       nodes: [
    //         {
    //           id: 'node-0',
    //           x: 60,
    //           y: 60,
    //           width: 80,
    //           height: 30,
    //           label: 'Hello',
    //         },
    //         {
    //           id: 'node-1',
    //           x: 240,
    //           y: 240,
    //           width: 80,
    //           height: 30,
    //           label: 'World',
    //         },
    //       ],
    //       edges: [
    //         {
    //           id: 'edge-0',
    //           source: 'node-0',
    //           target: 'node-1',
    //           label: 'Edge Label',
    //         },
    //       ],
    //     });
    //   },
    // );
  }
  render() {
    return (
      <PageHeaderWrapper>
        <div style={{ height: '100%' }}>
          <div style={{ display: 'inline-block', marginRight: 32 }}>
            <Menu>
              <MenuItem name="undo" hotkey="Cmd+Z">
                Undo
              </MenuItem>
              <MenuItem name="redo" hotkey="Cmd+Shift+Z">
                Redo
              </MenuItem>
              <Divider />
              <MenuItem name="cut" hotkey="Cmd+X">
                Cut
              </MenuItem>
              <MenuItem name="copy" hotkey="Cmd+C">
                Copy
              </MenuItem>
              <MenuItem name="paste" hotkey="Cmd+V" disabled={true}>
                Paste
              </MenuItem>
              <MenuItem name="delete" hotkey="Delete">
                Delete
              </MenuItem>
              <Divider />
              <SubMenu text="Appearance">
                <MenuItem name="fullscreen" hotkey="Cmd+Shift+F">
                  Full Screen
                </MenuItem>
                <MenuItem name="zen" hotkey="Cmd+K Z">
                  Zen Mode
                </MenuItem>
                <Divider />
                <MenuItem name="side-bar">Show Side Bar</MenuItem>
                <MenuItem name="status-bar">Show Status Bar</MenuItem>
                <MenuItem name="activity-bar">Show Activity Bar</MenuItem>
                <MenuItem name="editor-area">Show Editor Area</MenuItem>
                <MenuItem name="show-panel">Show Panel</MenuItem>
              </SubMenu>
            </Menu>
          </div>
        </div>
        {/* <div
          style={{
            width: '1000px',
            height: '600px',
          }}
          ref="container"
        ></div> */}
      </PageHeaderWrapper>
    );
  }
}

export default Flow;
