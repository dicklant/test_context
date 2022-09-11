import React from "react";
import "./App.css";
import * as microsoftTeams from "@microsoft/teams-js";
import { MyGlobalContext } from './Data'


interface IProps {
}

interface IState {
  copytmp: string;
}


/**
 * The 'Config' component is used to display your group tabs
 * user configuration options.  Here you will allow the user to
 * make their choices and once they are done you will need to validate
 * their choices and communicate that to Teams to enable the save button.
 */
class TabConfig extends React.Component<IProps, IState> {
  static contextType = MyGlobalContext;
  context : React.ContextType<typeof MyGlobalContext> | undefined;

  tabName : string;
  idSessionCode : string;

   constructor(props : IProps) {
    super(props);

    this.state = {
      copytmp: "nom a définir"
    };

    this.tabName = "Yellow tab";
    this.idSessionCode = "";
  }

  render() {

    const { copy, setCopy } =  this.context!;
  
    const onChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({copytmp: event.target.value});
    }

    const onChangeTabName = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.tabName = event.target.value;
    }

    const onChangeIdSessionCode = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.idSessionCode = event.target.value;
    }

    const onClickChangeState = () => {
      setCopy(this.state.copytmp);
     }


    // Initialize the Microsoft Teams SDK
    microsoftTeams.initialize();

    /**
     * When the user clicks "Save", save the url for your configured tab.
     * This allows for the addition of query string parameters based on
     * the settings selected by the user.
     */
    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
      const baseUrl = `https://${window.location.hostname}:${window.location.port}`;

      if(this.idSessionCode.length === 0) 
        microsoftTeams.settings.setSettings({
          suggestedDisplayName: this.tabName,
          entityId: "Test",
          contentUrl: baseUrl + "/index.html#/tab",
          websiteUrl: baseUrl + "/index.html#/tab",
        });
      else
        microsoftTeams.settings.setSettings({
          suggestedDisplayName: this.tabName,
          entityId: "Test",
          contentUrl: baseUrl + "/index.html#/tab/"+this.idSessionCode,
          websiteUrl: baseUrl + "/index.html#/tab",
        });
      saveEvent.notifySuccess();
    });

    /**
     * After verifying that the settings for your tab are correctly
     * filled in by the user you need to set the state of the dialog
     * to be valid.  This will enable the save button in the configuration
     * dialog.
     */
    microsoftTeams.settings.setValidityState(true);

    return (
    <div>
        <h1>Tab Configuration</h1>
        <p>Nom du tab</p>
        <input placeholder={this.tabName} onChange={onChangeTabName}/>
        <p>Code de session</p>
        <input placeholder="None" onChange={onChangeIdSessionCode}/>
        <p>Valeur du context</p>
        <input placeholder={this.state.copytmp} onChange={onChangeState}/>
        <button onClick={onClickChangeState}>Click me!</button>
        <h3>Context={copy}</h3>
      </div>
    );
  }
}

export default TabConfig;
