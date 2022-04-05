import React, { FC } from 'react';
import { Breadcrumb, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { flattenRoutes } from '../../../assets/js/publicFunc';
import routeConfig from '../../../route';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
interface Props {
    breadcrumbs: any[];
}
const routes = flattenRoutes(routeConfig);

const MyBreadcrumb: FC<Props> = ({ breadcrumbs }) => {
    const history = useHistory();
    return (
        <Breadcrumb className="bread-crumb">
            {breadcrumbs.map((bc, index) => (
                <Breadcrumb.Item key={bc.key}>
                    {/* <Link to={{
                        pathname:bc.match.path,
                        state:bc.location.state,
                    }}>
                        {bc.name}
                    </Link> */}
                    <Button
                        disabled={
                            (!bc.exact && bc.match.path !== '/') || index === breadcrumbs.length - 1
                        }
                        onClick={() => {
                            history.push(bc.match.path);
                        }}
                        style={{ padding: '0' }}
                        type="link"
                    >
                        {bc.name}
                    </Button>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default withBreadcrumbs(routes)(MyBreadcrumb);
