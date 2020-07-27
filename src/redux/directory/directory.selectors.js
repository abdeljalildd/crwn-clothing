import {createSelector} from 'reselect';

const Selectdirectory = state => state.directory;

export const SelectDirectorySections = createSelector(

	[Selectdirectory],
	directory => directory.sections
)