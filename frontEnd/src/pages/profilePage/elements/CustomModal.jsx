import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function CustomModal({ titulo, text, cargar, onChange, recargarPagina, setCancelar }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isRecargarPagina, setIsRecargarPagina] = useState(recargarPagina == "recargar");
    useEffect(() => {
        if (cargar) {
            onOpen();
        } else {
            onClose();
        }
    }, [cargar]);

    const cancelar = () => {
        setCancelar(true);
        onClose();
        onChange(false); 
    }

    const noCancelar = () => {
        setCancelar(false);
        onClose();
        onChange(false);
    }
    

    return (
        <>

            <Modal backdrop="blur" isOpen={isOpen} onClose={noCancelar} >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">{titulo}</ModalHeader>
                        <ModalBody>
                            {
                                text.map((linea, index) => (
                                    <p key={index}>
                                        {linea}
                                    </p>
                                ))
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onPress={noCancelar}>
                                No quiero eliminar la cuenta
                            </Button>
                            <Button color="danger" onPress={cancelar}>
                                Eliminar cuenta
                            </Button>
                        </ModalFooter>
                    </>

                </ModalContent>
            </Modal>
        </>
    );
}

