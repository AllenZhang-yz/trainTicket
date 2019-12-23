import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./CitySelector.css";

const CityItem = memo(({ name, onSelect }) => {
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  );
});

CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const CitySection = memo(({ title, cities = [], onSelect }) => {
  return (
    <ul className="city-ul">
      <li className="city-li" key="title" data-cate={title}>
        {title}
      </li>
      {cities.map(city => (
        <CityItem key={city.name} name={city.name} onSelect={onSelect} />
      ))}
    </ul>
  );
});

CitySection.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired
};

const AlphaIndex = memo(({ alpha, onClick }) => {
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});

AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const alphabet = Array.from(new Array(26), (el, index) =>
  String.fromCharCode(65 + index)
);

const CityList = memo(({ sections, onSelect, toAlpha }) => {
  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map(section => (
          <CitySection
            key={section.title}
            title={section.title}
            cities={section.citys}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="city-index">
        {alphabet.map(alpha => (
          <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />
        ))}
      </div>
    </div>
  );
});

CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  toAlpha: PropTypes.func.isRequired
};

const SuggestItem = memo(({ name, onClick }) => {
  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});

SuggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const Suggest = memo(({ searchKey, onSelect }) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    fetch("/rest/search?key=" + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data;
        if (sKey === searchKey) {
          setResult(result);
        }
      });
  }, [searchKey]);

  const fallBackResult = result.length ? result : [{ display: searchKey }];

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map(item => (
          <SuggestItem
            key={item.display}
            name={item.display}
            onClick={onSelect}
          />
        ))}
      </ul>
    </div>
  );
});

Suggest.propTypes = {
  searchKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const CitySelector = ({
  show,
  cityData,
  isLoading,
  onBack,
  fetchCityData,
  onSelect
}) => {
  const [searchKey, setSearchKey] = useState("");
  const key = useMemo(() => searchKey.trim(), [searchKey]);

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }

    fetchCityData();
    // eslint-disable-next-line
  }, [show, cityData, isLoading]);

  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
  }, []);

  const outputCitySections = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (cityData) {
      return (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          toAlpha={toAlpha}
        />
      );
    }
    return <div>error</div>;
  };

  return (
    <div className={classnames("city-selector", { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="City or station..."
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        <i
          className={classnames("search-clean", {
            hidden: key.length === 0
          })}
          onClick={() => setSearchKey("")}
        >
          &#xf063;
        </i>
      </div>
      {Boolean(key) && (
        <Suggest searchKey={key} onSelect={key => onSelect(key)} />
      )}
      {outputCitySections()}
    </div>
  );
};

export default memo(CitySelector);

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};
