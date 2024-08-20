function StateForm({ country }: { country: string }) {
    const states = ["California", "Texas", "New York", "Florida"]; // Add more states as needed
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Select a State in {country}</h2>
        <select className="border px-4 py-2 rounded-lg">
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
    );
  }
  export default StateForm;