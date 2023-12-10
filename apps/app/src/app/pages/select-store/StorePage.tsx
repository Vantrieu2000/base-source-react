/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { WrappedComponentProps, injectIntl, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import RegisterStore from './components/RegisterStore';
import SelectStore from './components/SelectStore';

export function StorePage(props: WrappedComponentProps) {
    const intl = useIntl();
    const [showComponent, setShowComponent] = useState<number>(1)
    const navigate = useNavigate();


    return (
        <div className="select-store" id="select-store">
            {
                showComponent === 1 ?
                    <SelectStore setComponent={setShowComponent} />
                    :
                    <RegisterStore setComponent={setShowComponent} />
            }
        </div>
    );
}

export default injectIntl(StorePage);
