import React, { Component, ChangeEvent} from "react";

export type Guest = {
  name: string;
  isJamesGuest: boolean;
  isFamily: boolean;
  plusOne: boolean;
  plusOneName: string;
  dietaryRestrictions: string[];
  plusOneDietaryRestrictions: string[];
}

type WeddingAppState = {
  guests: Guest[];
  newGuestName: string;
  newGuestIsJamesGuest: boolean;
  newGuestIsFamily: boolean;
  newGuestPlusOne: boolean;
  newGuestPlusOneName: string;
  newGuestDietaryRestrictions: string;
  newGuestPlusOneDietaryRestrictions: string;
  editingGuest: Guest | null;
}
type WeddingAppProps = {
  doHandleSaveGuestChange?: () => void;
  doHandleAddGuestChange?: () => void;
  
};

export class WeddingApp extends Component<{}, WeddingAppState, WeddingAppProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      guests: [],
      newGuestName: '',
      newGuestIsJamesGuest: false,
      newGuestIsFamily: false,
      newGuestPlusOne: false,
      newGuestPlusOneName: '',
      newGuestDietaryRestrictions: '',
      newGuestPlusOneDietaryRestrictions: '',
      editingGuest: null,
    };
  }

  render = (): JSX.Element => {
    return (
      <div>
        <h1>Wedding Guest List</h1>
        {this.state.editingGuest ? (
          this.renderEditGuestForm()
        ) : (
          <>
            <div>
              <h2>Add New Guest</h2>
              {this.renderAddGuestForm()}
              <button onClick={this.doHandleAddGuestChange}>Add Guest</button>
            </div>
            <div>
              <h2>Guest List</h2>
              {this.renderGuestList()}
              {this.renderGuestSummary()}
            </div>
          </>
        )}
      </div>
    );
  }

  renderAddGuestForm = (): JSX.Element => {
    return (
      <>
        <label>
          Name:
          <input
            type="text"
            value={this.state.newGuestName}
            onChange={this.doHandleNameChange}
          />
        </label>
        <br />
        <label>
          Guest of:
          <select
            value={this.state.newGuestIsJamesGuest ? 'James' : 'Molly'}
            onChange={this.doHandleGuestOfChange}
          >
            <option value="James">James</option>
            <option value="Molly">Molly</option>
          </select>
        </label>
        <br />
        <label>
          Family:
          <input
            type="checkbox"
            checked={this.state.newGuestIsFamily}
            onChange={this.doHandleFamilyChange}
          />
        </label>
        <br />
        <label>
          Bringing a Plus One?
          <input
            type="checkbox"
            checked={this.state.newGuestPlusOne}
            onChange={this.doHandlePlusOneChange}
          />
        </label>
        <br />
        <label>
          Dietary Restrictions:
          <input
            type="text"
            value={this.state.newGuestDietaryRestrictions}
            onChange={this.doHandleDietaryRestrictionsChange}
          />
        </label>
        {this.state.newGuestPlusOne && (
          <>
            <br />
            <label>
              Plus One Name:
              <input
                type="text"
                value={this.state.newGuestPlusOneName}
                onChange={this.doHandlePlusOneNameChange}
              />
            </label>
            <br />
            <label>
              Plus One Dietary Restrictions:
              <input
                type="text"
                value={this.state.newGuestPlusOneDietaryRestrictions}
                onChange={this.doHandlePlusOneDietaryRestrictionsChange}
              />
            </label>
          </>
        )}
      </>
    );
  }

  renderEditGuestForm = (): JSX.Element => {
    const editingGuest = this.state.editingGuest;
    if (!editingGuest) return <></>;
  

    return (
      <div>
        <h2>Edit Guest Details</h2>
        <label>
          Name: {editingGuest.name}
        </label>
        <br />
        <label>
          Guest of: {editingGuest.isJamesGuest ? 'James' : 'Molly'}
        </label>
        <br />
        <label>
          Family: {editingGuest.isFamily ? 'Yes' : 'No'}
        </label>
        <br />
        <label>
          Bringing a Plus One?
          <input
            type="checkbox"
            checked={editingGuest.plusOne}
            onChange={this.doHandlePlusOneChangeForEditChange}
          />
        </label>
        <br />
        <label>
          Dietary Restrictions:
          <input
            type="text"
            value={editingGuest.dietaryRestrictions.join(', ')}
            onChange={this.doHandleDietaryRestrictionsChangeForChange}
          />
        </label>
        {editingGuest.plusOne && (
          <>
            <br />
            <label>
              Plus One Name:
              <input
                type="text"
                value={editingGuest.plusOneName}
                onChange={this.doHandlePlusOneNameChangeForChange}
              />
            </label>
            <br />
            <label>
              Plus One Dietary Restrictions:
              <input
                type="text"
                value={editingGuest.plusOneDietaryRestrictions.join(', ')}
                onChange={this.doHandlePlusOneDietaryRestrictionsChangeForChange}
              />
            </label>
          </>
        )}
        <br />
        <button onClick={this.doHandleSaveGuestChange}>Save Changes</button>
        <button onClick={this.doHandleCancelEditGuestChange}>Cancel</button>
      </div>
    );
  }

  renderGuestList = (): JSX.Element => {
    return (
      <ul>
        {this.state.guests.map(this.renderGuestItem)}
      </ul>
    );
  }

  renderGuestItem = (guest: Guest, index: number): JSX.Element => {
    return (
      <li key={index} onClick={() => this.doHandleEditGuestChange(guest)}>
        {guest.name}
        {guest.isJamesGuest ? ' (James)' : ' (Molly)'}
        {guest.isFamily && ' (Family)'}
        {guest.plusOne && ` (+ ${guest.plusOneName})`}
      </li>
    );
  }

  renderGuestSummary = (): JSX.Element => {
    const jamesGuestsCount = this.state.guests.filter(
      (guest) => guest.isJamesGuest
    ).length;
    const mollyGuestsCount = this.state.guests.filter(
      (guest) => !guest.isJamesGuest
    ).length;
    const jamesFamilyCount = this.state.guests.filter(
      (guest) => guest.isJamesGuest && guest.isFamily
    ).length;
    const mollyFamilyCount = this.state.guests.filter(
      (guest) => !guest.isJamesGuest && guest.isFamily
    ).length;
    const unconfirmedPlusOnes = this.state.guests.filter(
      (guest) => !guest.plusOne
    ).length;
    const minGuests =
      this.state.guests.length + this.state.guests.filter((guest) => guest.plusOne).length;
    const maxGuests = minGuests + unconfirmedPlusOnes;

    return (
      <div>
        <h3>Guest Summary</h3>
        <p>
          James Guests: {jamesGuestsCount} ({jamesFamilyCount} Family)
        </p>
        <p>
          Molly Guests: {mollyGuestsCount} ({mollyFamilyCount} Family)
        </p>
        <p>Possible Guest Count: {minGuests} - {maxGuests}</p>
      </div>
    );
  }

  doHandleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ newGuestName: event.target.value });
  };

  doHandleGuestOfChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ newGuestIsJamesGuest: event.target.value === 'James' });
  };

  doHandleFamilyChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ newGuestIsFamily: event.target.checked });
  };

  doHandlePlusOneChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      newGuestPlusOne: event.target.checked,
      newGuestPlusOneName: '',
      newGuestPlusOneDietaryRestrictions: '',
    });
  };

  doHandleDietaryRestrictionsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ newGuestDietaryRestrictions: event.target.value });
  };

  doHandlePlusOneNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ newGuestPlusOneName: event.target.value });
  };

  doHandlePlusOneDietaryRestrictionsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ newGuestPlusOneDietaryRestrictions: event.target.value });
  };
  doHandleAddGuestChange = (): void => {
    const newGuestName = this.state.newGuestName;
    const newGuestIsJamesGuest = this.state.newGuestIsJamesGuest;
    const newGuestIsFamily = this.state.newGuestIsFamily;
    const newGuestPlusOne = this.state.newGuestPlusOne;
    const newGuestPlusOneName = this.state.newGuestPlusOneName;
    const newGuestDietaryRestrictions = this.state.newGuestDietaryRestrictions;
    const newGuestPlusOneDietaryRestrictions = this.state.newGuestPlusOneDietaryRestrictions;
    const guests = this.state.guests;
  
    if (!newGuestName.trim()) {
      alert('Please provide a name for the guest.');
      return;
    }
  
    const newGuest: Guest = {
      name: newGuestName,
      isJamesGuest: newGuestIsJamesGuest,
      isFamily: newGuestIsFamily,
      plusOne: newGuestPlusOne,
      plusOneName: newGuestPlusOneName,
      dietaryRestrictions: newGuestDietaryRestrictions
        ? newGuestDietaryRestrictions.split(',').map((r) => r.trim())
        : [],
      plusOneDietaryRestrictions: newGuestPlusOneDietaryRestrictions
        ? newGuestPlusOneDietaryRestrictions.split(',').map((r) => r.trim())
        : [],
    };
  
    const updatedGuests = guests.concat(newGuest);
  
    this.setState({
      guests: updatedGuests,
      newGuestName: '',
      newGuestIsJamesGuest: false,
      newGuestIsFamily: false,
      newGuestPlusOne: false,
      newGuestPlusOneName: '',
      newGuestDietaryRestrictions: '',
      newGuestPlusOneDietaryRestrictions: '',
    });
  };
  doHandleEditGuestChange = (guest: Guest): void => {
    this.setState({ editingGuest: guest });
  };

  doHandlePlusOneChangeForEditChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const editingGuest = this.state.editingGuest;
    if (!editingGuest) return;
  
    const updatedEditingGuest: Guest = {
      name: editingGuest.name,
      isJamesGuest: editingGuest.isJamesGuest,
      isFamily: editingGuest.isFamily,
      plusOne: event.target.checked,
      plusOneName: '',
      dietaryRestrictions: editingGuest.dietaryRestrictions,
      plusOneDietaryRestrictions: [],
    };
  
    this.setState({
      editingGuest: updatedEditingGuest,
    });
  }
  doHandleDietaryRestrictionsChangeForChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const editingGuest = this.state.editingGuest;
    if (!editingGuest) return;
  
    const updatedDietaryRestrictions = event.target.value.split(',').map((r) => r.trim());
    
    const updatedEditingGuest: Guest = {
      name: editingGuest.name,
      isJamesGuest: editingGuest.isJamesGuest,
      isFamily: editingGuest.isFamily,
      plusOne: editingGuest.plusOne,
      plusOneName: editingGuest.plusOneName,
      dietaryRestrictions: updatedDietaryRestrictions,
      plusOneDietaryRestrictions: editingGuest.plusOneDietaryRestrictions,
    };
  
    this.setState({
      editingGuest: updatedEditingGuest,
    });
  }

  doHandlePlusOneNameChangeForChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const editingGuest = this.state.editingGuest;
    if (!editingGuest) return;
  
    const updatedEditingGuest: Guest = {
      name: editingGuest.name,
      isJamesGuest: editingGuest.isJamesGuest,
      isFamily: editingGuest.isFamily,
      plusOne: editingGuest.plusOne,
      plusOneName: event.target.value,
      dietaryRestrictions: editingGuest.dietaryRestrictions,
      plusOneDietaryRestrictions: editingGuest.plusOneDietaryRestrictions,
    };
  
    this.setState({
      editingGuest: updatedEditingGuest,
    });
  }

  doHandlePlusOneDietaryRestrictionsChangeForChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const editingGuest = this.state.editingGuest;
    if (!editingGuest) return;
  
    const updatedEditingGuest: Guest = {
      name: editingGuest.name,
      isJamesGuest: editingGuest.isJamesGuest,
      isFamily: editingGuest.isFamily,
      plusOne: editingGuest.plusOne,
      plusOneName: editingGuest.plusOneName,
      dietaryRestrictions: editingGuest.dietaryRestrictions,
      plusOneDietaryRestrictions: event.target.value
        .split(',')
        .map((r) => r.trim()),
    };
  
    this.setState({
      editingGuest: updatedEditingGuest,
    });
  }

  doHandleSaveGuestChange = (): void => {
    const guests = this.state.guests;
    const editingGuest = this.state.editingGuest;
  
    if (!editingGuest) return;
  
    const updatedGuests = [];
    for (const guest of guests) {
      if (guest.name === editingGuest.name) {
        updatedGuests.push(editingGuest);
      } else {
        updatedGuests.push(guest);
      }
    }
  
    this.setState({
      guests: updatedGuests,
      editingGuest: null,
    });
  }

  doHandleCancelEditGuestChange = (): void => {
    this.setState({ editingGuest: null });
  };
}