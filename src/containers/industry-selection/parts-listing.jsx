import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { Fragment, useEffect, useState } from 'react';
import styles from './styles.module.css';
import axiosInstance from '@/api/axios';
import { CARBON_CALCULATOR } from '@/api/apiEndpoints';
import showToast from '@/utils/toastNotify';

export default function (props) {
	const {
		componentList,
		setComponentList,
		selectedIndustry,
		selectedSubIndustry,
	} = props;
	const [carbonFootprint, setCarbonFootprint] = useState(null);
	const updateComponentValues = (index, value) => {
		setComponentList((prevList) => {
			const updatedList = [...prevList];
			updatedList[index] = { ...updatedList[index], weight: value };
			return updatedList;
		});
	};

	const handleComponentEmission = () => {
		const payload = {
			industry: selectedIndustry,
			sub_industry: selectedSubIndustry,
			components: componentList,
		};

		axiosInstance
			.post(CARBON_CALCULATOR, payload)
			.then((response) => {
				if (response?.data) {
					showToast('success', 'Fetched Successfully !');
					setCarbonFootprint(response?.data?.carbon_footprint);
				}
			})
			.catch(() => {
				showToast('error', 'Failed to fetch Component List');
			});
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div className={styles.componentContainer}>
				<div className={styles.componentTableHeader}>
					<span style={{ fontWeight: 'bolder' }}>Emission Factor</span>
					<span style={{ fontWeight: 'bolder' }}>Sub-Parts</span>
					<span style={{ fontWeight: 'bolder' }}>Weight</span>
				</div>
				{componentList?.map((comp, index) => (
					<div className={styles.componentTableRows}>
						<span>{comp['Sub-Parts']}</span>
						<span>{comp['Emission Factor']}</span>
						<span>
							<Input
								onChange={({ target }) => updateComponentValues(index, target.value)}
								placeholder='0'
								style={{ marginRight: '12px' }}
							/>
						</span>
					</div>
				))}
			</div>
			<div
				style={{
					width: '120px',
					alignSelf: 'center',
					marginTop: '12px',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Button style={{ width: '120px' }} onClick={handleComponentEmission}>
					Calculate
				</Button>
				{carbonFootprint && (
					<span style={{ marginLeft: '12px' }}> {carbonFootprint}</span>
				)}
			</div>
		</div>
	);
}
