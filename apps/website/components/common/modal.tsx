import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { Fragment, useRef } from 'react';
import Button from './button';
import { ButtonUse } from './button';

type ModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  primaryButtonText: string;
  primaryButtonAction: () => void;
  pimaryButtonUse: ButtonUse;
};

const Modal = ({
  title,
  description,
  isOpen,
  setIsOpen,
  primaryButtonText,
  primaryButtonAction,
  pimaryButtonUse,
}: ModalProps) => {
  const cancelButtonRef = useRef(null);
  const { t } = useTranslation('common');

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="mt-4 space-x-2 flex justify-end">
                    <Button
                      ref={cancelButtonRef}
                      type="button"
                      use="secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('cancel')}
                    </Button>
                    <Button
                      type="button"
                      use={pimaryButtonUse}
                      onClick={() => {
                        setIsOpen(false);
                        primaryButtonAction();
                      }}
                    >
                      {primaryButtonText}
                    </Button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;
