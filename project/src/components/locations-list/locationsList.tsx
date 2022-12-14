import classNames from 'classnames';
import { memo } from 'react';
import { useDispatchTyped, useSelectorTyped } from '../../hooks/typedWrappers';
import { setLocationName } from '../../store/data-slice/dataSlice';
import { locationNameSelector } from '../../store/selectors';

type LocationsListProps = {
  locationNamesList: string[];
}

function LocationsList ({locationNamesList}:LocationsListProps):JSX.Element {
  const selectedCity = useSelectorTyped(locationNameSelector);
  const dispatch = useDispatchTyped();

  const onLocationClickHandle = (evt: React.MouseEvent, locationName:string) => {
    evt.preventDefault();
    dispatch(setLocationName({locationName: locationName }));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {locationNamesList.map((locationName) => (
          <li key={locationName} className="locations__item">
            <a onClick={(e) => onLocationClickHandle(e, locationName)}
              className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': selectedCity === locationName})}
              href="/#"
            >
              <span>{locationName}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(LocationsList);
