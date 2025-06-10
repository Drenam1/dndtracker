import React from "react";
import "./App.css";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import SaveLoadHelper from "./helpers/SaveLoadHelper";
import { Faction } from "./models/Faction";
import { Location } from "./models/Location";
import { Npc } from "./models/Npc";
import NpcSection from "./components/Npcs/NpcSection";
import FactionSection from "./components/Factions/FactionSection";
import LocationSection from "./components/Locations/LocationSection";
import ClockOverviewPanel from "./components/ClockOverview/ClockOverviewPanel";

initializeIcons();
//To compile, run npm start

function App() {
  const [factions, setFactions] = React.useState<Faction[]>([]);
  const [npcs, setNpcs] = React.useState<Npc[]>([]);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [clockOverviewPanelOpen, setClockOverviewPanelOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const loadFromLocalCache = () => {
      const cachedNpcs = localStorage.getItem("dndtracker-npcs");
      const cachedFactions = localStorage.getItem("dndtracker-factions");
      const cachedLocations = localStorage.getItem("dndtracker-locations");

      if (cachedNpcs) {
        setNpcs(JSON.parse(cachedNpcs));
      }
      if (cachedFactions) {
        setFactions(JSON.parse(cachedFactions));
      }
      if (cachedLocations) {
        setLocations(JSON.parse(cachedLocations));
      }
    };

    loadFromLocalCache();
  }, []);

  React.useEffect(() => {
    const saveToLocalCacheAuto = () => {
      localStorage.setItem("dndtracker-npcs", JSON.stringify(npcs));
      localStorage.setItem("dndtracker-factions", JSON.stringify(factions));
      localStorage.setItem("dndtracker-locations", JSON.stringify(locations));
    };

    const interval = setInterval(saveToLocalCacheAuto, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [npcs, factions, locations]);

  const saveToLocalCacheManual = () => {
    localStorage.setItem("dndtracker-npcs", JSON.stringify(npcs));
    localStorage.setItem("dndtracker-factions", JSON.stringify(factions));
    localStorage.setItem("dndtracker-locations", JSON.stringify(locations));
  };

  const saveNpc = (npc: Npc) => {
    if (npcs.find((existingNpc) => existingNpc.id === npc.id) !== undefined) {
      const updatedNpcs = npcs.map((existingNpc) =>
        existingNpc.id === npc.id ? npc : existingNpc
      );
      setNpcs(updatedNpcs);
    } else if (npc.name && npc.name.trim() !== "") {
      const updatedNpcs = [...npcs, npc];
      setNpcs(updatedNpcs);
    }
  };

  const deleteNpc = (npc: Npc) => {
    if (npcs.find((existingNpc) => existingNpc.id === npc.id) !== undefined) {
      let updatedNpcs = npcs.filter((existingNpc) => existingNpc.id !== npc.id);

      // Remove the NPC from any relationships they were part of
      updatedNpcs = updatedNpcs.map((existingNpc) => {
        return {
          ...existingNpc,
          relationships: existingNpc.relationships?.filter(
            (relationship) => relationship.person.id !== npc.id
          ),
        };
      });
      setNpcs(updatedNpcs);
    }
  };

  const saveFaction = (faction: Faction) => {
    if (
      factions.find((existingfaction) => existingfaction.id === faction.id) !==
      undefined
    ) {
      const updatedFactions = factions.map((existingFaction) =>
        existingFaction.id === faction.id ? faction : existingFaction
      );
      setFactions(updatedFactions);
    } else if (faction.name && faction.name.trim() !== "") {
      const updatedFactions = [...factions, faction];
      setFactions(updatedFactions);
    }
  };
  const deleteFaction = (faction: Faction) => {
    if (
      factions.find((existingFaction) => existingFaction.id === faction.id) !==
      undefined
    ) {
      let updatedFactions = factions.filter(
        (existingFaction) => existingFaction.id !== faction.id
      );

      // Remove the faction from any NPCs
      const updatedNpcs = npcs.map((existingNpc) => {
        return {
          ...existingNpc,
          factions: existingNpc.factions?.filter(
            (currentFaction) => currentFaction.id !== faction.id
          ),
        };
      });
      setNpcs(updatedNpcs);
      setFactions(updatedFactions);
    }
  };

  const saveLocation = (location: Location) => {
    if (
      locations.find(
        (existinglocation) => existinglocation.id === location.id
      ) !== undefined
    ) {
      const updatedLocations = locations.map((existingLocation) =>
        existingLocation.id === location.id ? location : existingLocation
      );
      setLocations(updatedLocations);
    } else if (location.name && location.name.trim() !== "") {
      const updatedLocations = [...locations, location];
      setLocations(updatedLocations);
    }
  };
  const deleteLocation = (location: Location) => {
    if (
      locations.find(
        (existingLocation) => existingLocation.id === location.id
      ) !== undefined
    ) {
      let updatedLocations = locations.filter(
        (existingLocation) => existingLocation.id !== location.id
      );

      // Remove the location from any NPCs
      const updatedNpcs = npcs.map((existingNpc) => {
        return {
          ...existingNpc,
          locations: existingNpc.locations?.filter(
            (currentLocation) => currentLocation.id !== location.id
          ),
        };
      });

      // Remove the location from any Factions
      const updatedFactions = factions.map((existingFaction) => {
        return {
          ...existingFaction,
          locations: existingFaction.locations?.filter(
            (currentLocation) => currentLocation.id !== location.id
          ),
        };
      });
      setNpcs(updatedNpcs);
      setFactions(updatedFactions);
      setLocations(updatedLocations);
    }
  };

  return (
    <div className="App">
      <div id="topControlsContainer">
        <input type="text" id="fileName" placeholder="File Name" />
        <button
          id="save"
          onClick={() =>
            SaveLoadHelper.saveToFile(
              npcs,
              factions,
              locations,
              (document.getElementById("fileName") as HTMLInputElement).value
            )
          }
        >
          Save
        </button>
        <input
          type="file"
          id="load"
          accept=".json"
          onChange={(event) =>
            SaveLoadHelper.loadFromFile(event, (json: any) => {
              setNpcs(json[0]);
              setFactions(json[1]);
              setLocations(json[2]);
              const documentNameSource = document.getElementById(
                "load"
              ) as HTMLInputElement;
              (document.getElementById("fileName") as HTMLInputElement).value =
                documentNameSource.value.split("\\")[2].split(".")[0];
            })
          }
        />
        <button
          id="saveToLocalCache"
          onClick={() => {
            saveToLocalCacheManual();
          }}
        >
          Save to local cache
        </button>
        <button
          id="clearLocalCache"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to clear the local cache? This cannot be undone."
              )
            ) {
              localStorage.removeItem("dndtracker-npcs");
              localStorage.removeItem("dndtracker-factions");
              localStorage.removeItem("dndtracker-locations");
              window.location.reload();
            }
          }}
        >
          Clear local cache
        </button>
        <p style={{ margin: "unset" }}>
          The saved data will automatically save to the cache at 5-minute
          intervals to reduce the chance of loss of data. You should still save
          to a file regularly.
        </p>
        <button
          id="editClocks"
          onClick={() => {
            setClockOverviewPanelOpen(true);
          }}
        >
          Edit existing clocks
        </button>
      </div>
      <div id="containerContainer">
        <NpcSection
          npcs={npcs}
          factions={factions}
          locations={locations}
          saveNpc={saveNpc}
          deleteNpc={deleteNpc}
        />
        <FactionSection
          npcs={npcs}
          factions={factions}
          locations={locations}
          saveFaction={saveFaction}
          deleteFaction={deleteFaction}
        />
        <LocationSection
          npcs={npcs}
          factions={factions}
          locations={locations}
          saveLocation={saveLocation}
          deleteLocation={deleteLocation}
        />
      </div>
      {clockOverviewPanelOpen && (
        <ClockOverviewPanel
          npcs={npcs}
          factions={factions}
          locations={locations}
          onDismiss={() => setClockOverviewPanelOpen(false)}
          saveClocks={(clocks) => {
            // Save clocks logic here if needed
            console.log("Clocks saved:", clocks);
            clocks.forEach((clock) => {
              if (clock.itemType === "npc") {
                const npcIndex = npcs.findIndex(
                  (npc) => npc.id === clock.itemId
                );
                if (npcIndex !== -1) {
                  const updatedNpcs = [...npcs];
                  updatedNpcs[npcIndex].clocks =
                    updatedNpcs[npcIndex].clocks?.filter(
                      (existingClock) => existingClock.id !== clock.id
                    ) || [];
                  updatedNpcs[npcIndex]?.clocks?.push(clock);
                  setNpcs(updatedNpcs);
                }
              } else if (clock.itemType === "faction") {
                const factionIndex = factions.findIndex(
                  (faction) => faction.id === clock.itemId
                );
                if (factionIndex !== -1) {
                  const updatedFactions = [...factions];
                  updatedFactions[factionIndex].clocks =
                    updatedFactions[factionIndex].clocks?.filter(
                      (existingClock) => existingClock.id !== clock.id
                    ) || [];
                  updatedFactions[factionIndex]?.clocks?.push(clock);
                  setFactions(updatedFactions);
                }
              } else if (clock.itemType === "location") {
                const locationIndex = locations.findIndex(
                  (location) => location.id === clock.itemId
                );
                if (locationIndex !== -1) {
                  const updatedLocations = [...locations];
                  updatedLocations[locationIndex].clocks =
                    updatedLocations[locationIndex].clocks?.filter(
                      (existingClock) => existingClock.id !== clock.id
                    ) || [];
                  updatedLocations[locationIndex]?.clocks?.push(clock);
                  setLocations(updatedLocations);
                }
              }
            });
            setClockOverviewPanelOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
