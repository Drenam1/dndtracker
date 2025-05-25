import React from "react";
import { Npc } from "../../models/Npc";

export interface ISectionProps {
  npcs: Npc[];
  setSelectedItems: any;
}

const Npcs: React.FunctionComponent<ISectionProps> = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.npcs.map((npc: Npc) => {
            return (
              <tr key={npc.id}>
                <td onClick={() => props.setSelectedItems(npc)}>{npc.id}</td>
                <td onClick={() => props.setSelectedItems(npc)}>{npc.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Npcs;
