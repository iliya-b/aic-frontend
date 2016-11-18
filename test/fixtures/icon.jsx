import React from 'react';
import {FontIcon} from 'material-ui';
import CampaignIcon from 'app/components/icon/campaign-icon';
import MachineIcon from 'app/components/icon/machine-icon';
import ProjectIcon from 'app/components/icon/project-icon';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';
import StatusIcon from 'app/components/icon/status-icon';

const AvatarProgressProps = [{
	title: '4 colors',
	components: [{
		props: {
			key: 1,
			icon: <FontIcon className="mdi mdi-android"/>,
			backgroundColor: '#A2A2A2',
			progress: [
				{id: 1, progress: 10, color: 'red'},
				{id: 2, progress: 20, color: 'blue'},
				{id: 3, progress: 40, color: 'violet'},
				{id: 4, progress: 70, color: 'orange'}
			]
		}
	}]
}, {
	title: 'no animation',
	components: [{
		props: {
			key: 1,
			animation: false,
			icon: <FontIcon className="mdi mdi-android"/>,
			backgroundColor: '#A2A2A2',
			progress: [
				{id: 1, progress: 10, color: 'red'},
				{id: 2, progress: 20, color: 'blue'},
				{id: 3, progress: 40, color: 'violet'},
				{id: 4, progress: 70, color: 'orange'}
			]
		}
	}]
}];

const CampaignIconProps = [
	{
		title: 'without tooltip',
		components: CampaignIcon.SIZE_LIST.map(s1 => {
			const iconListProps = CampaignIcon.STATUS_LIST.map(s2 => {
				return {props: {key: `${s1}-${s2}`, status: s2, size: s1}};
			});
			return {title: s1, components: iconListProps};
		})
	}, {
		title: 'with tooltip',
		components: CampaignIcon.SIZE_LIST.map(s1 => {
			const iconListProps = CampaignIcon.STATUS_LIST.map(s2 => {
				return {props: {key: `${s1}-${s2}`, status: s2, size: s1, tooltip: s2}};
			});
			return {title: s1, components: iconListProps};
		})
	}
];

const images = ['kitkat-phone', 'kitkat-tablet', 'lollipop-phone', 'lollipop-tablet', 'unknown-unknown'];
const DeviceIconProps = [{
	title: 'On',
	components: images.map((c, i) => ({props: {key: i, style: {margin: 10}, isOn: true, image: c}}))
}, {
	title: 'Off',
	components: images.map((c, i) => ({props: {key: i, style: {margin: 10}, isOn: false, image: c}}))
}];

const DroidDevilIconProps = [{
	props: {key: 1, style: {width: 100, height: 100, margin: 10}}
}];

const DroidPercentageProps = [{
	title: '0%',
	components: [{props: {key: 1, value: 0}}]
}, {
	title: '33%',
	components: [{props: {key: 1, value: 33}}]
}, {
	title: '66%',
	components: [{props: {key: 1, value: 66}}]
}, {
	title: '100%',
	components: [{props: {key: 1, value: 100}}]
}];

const MachineIconProps = MachineIcon.SIZE_LIST.map(s1 => {
	const iconListProps = MachineIcon.STATUS_LIST.map(s2 => {
		return {props: {key: `${s1}-${s2}`, status: s2, size: s1}};
	});
	return {title: s1, components: iconListProps};
});

const ProjectIconProps = ProjectIcon.SIZE_LIST.map(s1 => {
	const iconListProps = ProjectIcon.STATUS_LIST.map(s2 => {
		return {props: {key: `${s1}-${s2}`, status: s2, size: s1}};
	});
	return {title: s1, components: iconListProps};
});

const SimpleStatusIconProps = SimpleStatusIcon.STATUS_LIST_ARR.map(s2 => {
	return {title: s2, components: [{props: {key: s2, status: s2}}]};
});
SimpleStatusIconProps.push({title: 'unknown', components: [{props: {key: 'unknown', status: 'unknown'}}]});

const IconButtonAppProps = [{
	props: {primary: true, iconClassName: 'mdi mdi-panda'}
}, {
	throwsError: true,
	props: {primary: true, secondary: true, iconClassName: 'mdi mdi-panda'}
}, {
	props: {secondary: true, iconClassName: 'mdi mdi-panda'}
}, {
	props: {on: true, iconClassName: 'mdi mdi-panda'}
}, {
	props: {off: true, iconClassName: 'mdi mdi-panda'}
}];

const IconListProps = [{
	props: {buttons: [{
		id: 'arrow',
		tooltip: 'arrow',
		fontIcon: 'mdi mdi-arrow'
	}], onClick: {
		arrow: null
	}}
}];

const iconStatus = <FontIcon className="mdi mdi-panda"/>;
const StatusIconProps = StatusIcon.SIZE_LIST.map(s1 => {
	const iconListProps = StatusIcon.STATUS_LIST.map(s2 => {
		return {props: {icon: iconStatus, key: `${s1}-${s2}`, status: s2, size: s1}};
	});
	iconListProps.push({props: {icon: iconStatus, key: 'unknown', status: 'unknown', size: s1}});
	return {title: s1, components: iconListProps};
});

const variants = ['kitkatTablet', 'kitkatPhone', 'lollipopTablet',
	'lollipopPhone', 'kitkatPhoneAudio', 'kitkatMp'];
const VariantIconProps = variants.map(v => ({title: v, components: [{props: {key: v, variant: {id: v}}}]}));

const componentsProps = {
	AvatarProgress: AvatarProgressProps,
	CampaignIcon: CampaignIconProps,
	DeviceIcon: DeviceIconProps,
	DroidDevilIcon: DroidDevilIconProps,
	DroidPercentage: DroidPercentageProps,
	MachineIcon: MachineIconProps,
	ProjectIcon: ProjectIconProps,
	SimpleStatusIcon: SimpleStatusIconProps,
	IconButtonApp: IconButtonAppProps,
	IconList: IconListProps,
	StatusIcon: StatusIconProps,
	VariantIcon: VariantIconProps
};

module.exports = componentsProps;
