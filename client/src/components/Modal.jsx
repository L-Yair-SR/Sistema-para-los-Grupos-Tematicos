import Popup from 'reactjs-popup';

function Modal() {
    return(
        <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
  >
    {close => (
      <div className="text-lg block b-slate-900">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="w-full border-b-4 border-slate-600 text-center p-5"> Modal Title </div>
        <div className="w-full px-2.5 py-1.5 m-auto text-center">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
      </div>
    )}
  </Popup>
    )
}

export default Modal;