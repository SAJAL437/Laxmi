const AddressCard = ({ address }) => {
  return (
    <div>
      <div className="space-y-2">
        <p className="font-bold">{`${address?.name}`}</p>
        <p>{`${address?.streetAddress} ${address?.city} ${address?.state} ${address?.zipCode} ${address.geolocation}`}</p>
        <div className="space-y-1">
          <p className="font-bold">Phone Number</p>
          <p>{address?.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;