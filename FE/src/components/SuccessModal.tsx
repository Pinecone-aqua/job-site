// import Link from "next/link";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function SuccessModal({ btnText }: { btnText: string }) {
  // const { setModal } = props;
  // console.log(setModal);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        label={btnText}
        // icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </>
  );
}

// <>
//   <div className="successModal visible">
//     <div className="bgOpacity" />
//     <div className="success">
//       <div className="body">
//         <picture className="succeedImage">
//           <img src="../image/succeedImage.png" alt="#" />
//         </picture>
//         <p className="para">Congratulations </p>
//       </div>
//       <Link href={`../`}>
//         <button className="applicationBtn">Go Home</button>
//       </Link>
//     </div>
//   </div>
// </>
