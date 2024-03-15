import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css';
import axiosInstance from '@/api/axios';
import {
	COMPONENT_LIST,
	INDUSTRY_LIST,
	SUBINDUSTRY_LIST,
} from '@/api/apiEndpoints';
import showToast from '@/utils/toastNotify';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import dummyData from './dummy.json';
import { populateOptions } from '@/utils/populateOptions';
import PartsListing from './parts-listing';
import { isLoggedIn } from '@/utils/auth';
export default function () {
	const [industryList, setIndustryList] = useState([]);
	const [subIndustryList, setSubIndustryList] = useState([]);
	const [selectedIndustry, setSelectedIndustry] = useState('');
	const [selectedSubIndustry, setSelectedSubIndustry] = useState('');
	const [componentList, setComponentList] = useState([]);

	const getIndustryList = useCallback(() => {
		axiosInstance
			.get(INDUSTRY_LIST)
			.then((response) => {
				response?.data && setIndustryList(response?.data?.industry);
			})
			.catch(() => {
				showToast('error', 'Failed to fetch Industry List');
				// setIndustryList(dummyData.industry);
			});
	}, []);

	const getSubIndustryList = useCallback(() => {
		axiosInstance
			.get(SUBINDUSTRY_LIST)
			.then((response) => {
				response?.data && setSubIndustryList(response?.data['sub-industry']);
			})
			.catch(() => {
				showToast('error', 'Failed to fetch SubIndustry List');
				// setSubIndustryList(dummyData.subIndustry);
			});
	}, []);

	const getComponentList = () => {
		const appendValues = (list) => {
			const updatedList = list.map((comp) => ({ ...comp, weight: 0 }));
			setComponentList(updatedList);
		};
		const payload = {
			industry: selectedIndustry,
			sub_industry: selectedSubIndustry,
		};

		axiosInstance
			.post(COMPONENT_LIST, payload)
			.then((response) => {
				response.data && appendValues(response?.data?.components);
			})
			.catch((error) => {
				showToast('error', 'Failed to fetch Component List');
				// appendValues(dummyData.componentList['components']);
			});
	};
	useEffect(() => {
		if (isLoggedIn()) {
			getIndustryList();
			getSubIndustryList();
		}
	}, []);
	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.dropDownSection}>
					<Select
						style={{ width: '300px' }}
						placeholder='Select Industry'
						options={populateOptions(industryList)}
						onSelect={setSelectedIndustry}
						showSearch
					/>
					<Select
						disabled={selectedIndustry.length == 0}
						style={{ width: '300px' }}
						placeholder='Select SubIndustry'
						options={populateOptions(subIndustryList)}
						onSelect={setSelectedSubIndustry}
						showSearch
					/>
					<Button
						disabled={selectedIndustry.length == 0 || selectedSubIndustry.length == 0}
						onClick={() => {
							getComponentList();
						}}
					>
						Submit
					</Button>
				</div>
				<div className={styles.partsListing}>
					{componentList.length > 0 && (
						<PartsListing
							componentList={componentList}
							setComponentList={setComponentList}
							selectedIndustry={selectedIndustry}
							selectedSubIndustry={selectedSubIndustry}
						/>
					)}
				</div>
			</div>
		</Fragment>
	);
}
