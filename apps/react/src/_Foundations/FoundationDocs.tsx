import {
  colors as semanticColors,
  duration as semanticDuration,
  fontSizes as semanticFontSizes,
  opacity as semanticOpacity,
} from 'theme/semanticToken';
import {
  animations,
  colors as primitiveColors,
  duration as primitiveDuration,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  opacity as primitiveOpacity,
  radii,
  shadows,
  spacing,
  zIndex,
} from 'theme/token';

type TokenGroup = Record<string, string | number>;

const px = (rem: string) => `${Number.parseFloat(rem) * 16}px`;

const shadowValue = (value: string | { value: string }) =>
  typeof value === 'string' ? value : value.value;

const cssVariable = (value: string) => value.match(/var\((--[^,]+)/)?.[1];

function TokenValue({ name, value }: { name: string; value: string | number }) {
  return (
    <div className="foundation-token-value">
      <code>{name}</code>
      <span>{String(value)}</span>
    </div>
  );
}

function ColorScale({ name, scale }: { name: string; scale: TokenGroup }) {
  const hasDarkBackground = name === 'whiteAlpha';

  return (
    <section
      className="foundation-color-scale"
      aria-label={`${name} 색상 스케일`}
    >
      <h3>{name}</h3>
      <div className="foundation-swatches">
        {Object.entries(scale).map(([step, value]) => (
          <div className="foundation-swatch" key={step}>
            <div
              className="foundation-swatch-color"
              style={{
                backgroundColor: hasDarkBackground ? '#111827' : String(value),
                backgroundImage: hasDarkBackground
                  ? `linear-gradient(${String(value)}, ${String(value)})`
                  : undefined,
              }}
              title={String(value)}
            />
            <code>{step}</code>
            <span>{String(value)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PrimitiveColors() {
  const baseColors = {
    transparent: primitiveColors.transparent,
    black: primitiveColors.black,
    white: primitiveColors.white,
  };
  const scales = Object.entries(primitiveColors).filter(
    ([, value]) => typeof value === 'object',
  ) as [string, TokenGroup][];

  return (
    <div className="foundation-stack">
      <div className="foundation-base-colors">
        {Object.entries(baseColors).map(([name, value]) => (
          <div className="foundation-base-color" key={name}>
            <div
              className={
                name === 'transparent'
                  ? 'foundation-base-color-preview is-transparent'
                  : 'foundation-base-color-preview'
              }
              style={{ backgroundColor: value }}
            />
            <TokenValue name={name} value={value} />
          </div>
        ))}
      </div>
      {scales.map(([name, scale]) => (
        <ColorScale key={name} name={name} scale={scale} />
      ))}
    </div>
  );
}

const intentNames = [
  'primary',
  'neutral',
  'info',
  'success',
  'danger',
  'warning',
] as const;

const intentDescriptions: Record<(typeof intentNames)[number], string> = {
  primary: '브랜드를 대표하는 주요 행동과 선택을 강조합니다.',
  neutral: '일반적인 행동, 보조 행동과 기본 UI 상태를 표현합니다.',
  info: '사용자가 알아야 할 정보와 안내 상태를 전달합니다.',
  success: '작업의 성공, 완료와 긍정적인 상태를 전달합니다.',
  danger: '오류, 실패와 삭제 같은 파괴적인 행동을 경고합니다.',
  warning: '주의가 필요하거나 확인해야 하는 상태를 알립니다.',
};

const intentRoles = [
  'DEFAULT',
  'stronger',
  'strong',
  'subtle',
  'subtler',
  'subtlest',
  'alpha',
  'alpha2',
  'fg',
  'boundary',
] as const;

const intentRoleDescriptions: Record<(typeof intentRoles)[number], string> = {
  DEFAULT: '기본 배경과 대표 강조색',
  stronger: 'pressed·active 상태',
  strong: 'hover 상태',
  subtle: '선택 범위 등 넓은 강조 배경',
  subtler: '중간 강도의 보조 배경',
  subtlest: '가장 옅은 보조 배경',
  alpha: '투명한 hover·낮은 강조 배경',
  alpha2: '투명한 pressed 배경',
  fg: '단색 intent 배경 위 콘텐츠',
  boundary: '테두리·focus 강조선',
};

export function SemanticColors() {
  return (
    <div className="foundation-semantic-grid">
      {intentNames.map(intent => {
        const tokens = semanticColors[intent];

        return (
          <section className="foundation-semantic-card" key={intent}>
            <h3>{intent}</h3>
            <p className="foundation-intent-description">
              {intentDescriptions[intent]}
            </p>
            <div className="foundation-semantic-roles">
              {intentRoles.map(role => {
                const value = tokens[role];

                return (
                  <div className="foundation-semantic-role" key={role}>
                    <div style={{ backgroundColor: value }} />
                    <span>{role}</span>
                    <code>{cssVariable(value)}</code>
                    <span className="foundation-semantic-description">
                      {intentRoleDescriptions[role]}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

const interfaceRoleDescriptions = {
  fg: {
    DEFAULT: '본문과 일반 콘텐츠의 기본 전경색',
    title: '제목과 강하게 강조하는 텍스트',
    label: '폼 요소와 선택 항목의 라벨',
    description: '설명과 보조 본문 텍스트',
    placeholder: '값이 없는 입력 요소의 안내 문구',
    caption: '캡션과 부가 정보 텍스트',
    trigger: '버튼·탭·선택 트리거의 콘텐츠',
    highlight: 'hover·선택 상태에서 강조하는 콘텐츠',
    muted: '비활성화되거나 약하게 표시하는 콘텐츠',
    input: '입력 요소에 작성된 값',
    popover: 'Popover와 Dropdown 내부 콘텐츠',
    indicator: '선택 여부를 나타내는 표시와 아이콘',
  },
  boundary: {
    DEFAULT: '요소와 영역을 구분하는 기본 경계선',
    muted: '비활성화되거나 약하게 표시하는 경계선',
    swatch: '색상 견본을 구분하는 외곽선',
    trigger: '선택 트리거와 조작 요소의 경계선',
    radio: 'Radio control의 외곽선',
    input: 'Input·Textarea 등 입력 요소의 경계선',
    popover: 'Popover와 Tooltip 표면의 경계선',
  },
  layer: {
    fill: 'Table·Card 등 낮은 강조의 채워진 표면',
    hover: '요소에 마우스를 올린 상태의 표면',
    pressed: '요소를 누르고 있는 상태의 표면',
    indicator: 'Carousel 등 현재 위치 표시의 표면',
    thumb: 'Slider와 Switch 손잡이의 표면',
    marker: 'Slider 눈금과 위치 표시의 표면',
    alpha: '투명한 조작 요소의 기본 표면',
    alpha2: '투명한 조작 요소의 hover 표면',
    alpha3: '투명한 조작 요소의 pressed 표면',
    card: 'Card와 목록 항목의 독립된 표면',
    popover: 'Popover·Dropdown·Toast의 떠 있는 표면',
    highlight: '선택되거나 강조된 목록 항목의 표면',
    modal: 'Dialog와 Drawer의 전면 표면',
    muted: '비활성화·대체 콘텐츠의 약한 표면',
    input: '값을 입력하는 폼 요소의 표면',
    track: 'Progress와 Slider 트랙의 표면',
  },
} as const;

const standaloneColorDescriptions = {
  transparent: '배경색을 적용하지 않는 투명 표면',
  base: '페이지와 기본 콘텐츠 영역의 기준 표면',
  dimmed: 'Modal·Drawer 뒤의 화면을 가리는 backdrop',
  spinner: '로딩 진행 상태를 나타내는 Spinner 색상',
} as const;

export function InterfaceColors() {
  const groups = ['fg', 'boundary', 'layer'] as const;
  const standalone = {
    transparent: semanticColors.transparent,
    base: semanticColors.base,
    dimmed: semanticColors.dimmed,
    spinner: semanticColors.spinner,
  };

  return (
    <div className="foundation-stack">
      <div className="foundation-role-grid">
        {groups.map(group => {
          const descriptions = interfaceRoleDescriptions[group] as Record<
            string,
            string
          >;

          return (
            <section className="foundation-role-card" key={group}>
              <h3>{group}</h3>
              {Object.entries(semanticColors[group]).map(([name, value]) => (
                <div className="foundation-role-row" key={name}>
                  <span
                    className="foundation-role-chip"
                    style={{ backgroundColor: value }}
                  />
                  <code>{name}</code>
                  <div className="foundation-role-content">
                    <span className="foundation-role-variable">
                      {cssVariable(value)}
                    </span>
                    <span className="foundation-role-description">
                      {descriptions[name]}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>
      <section className="foundation-role-card">
        <h3>standalone</h3>
        <div className="foundation-standalone-grid">
          {Object.entries(standalone).map(([name, value]) => (
            <div className="foundation-role-row" key={name}>
              <span
                className="foundation-role-chip"
                style={{ backgroundColor: value }}
              />
              <code>{name}</code>
              <div className="foundation-role-content">
                <span className="foundation-role-variable">
                  {cssVariable(value)}
                </span>
                <span className="foundation-role-description">
                  {
                    standaloneColorDescriptions[
                      name as keyof typeof standaloneColorDescriptions
                    ]
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function TypographyTokens() {
  return (
    <div className="foundation-stack">
      <div className="foundation-type-families">
        {Object.entries(fonts).map(([name, value]) => (
          <div className="foundation-type-family" key={name}>
            <span style={{ fontFamily: value }}>Aa 가나 0123</span>
            <TokenValue name={name} value={value} />
          </div>
        ))}
      </div>
      <section className="foundation-type-scale" aria-label="기본 글자 크기">
        {Object.entries(fontSizes).map(([name, value]) => (
          <div className="foundation-type-row" key={name}>
            <span style={{ fontSize: value, lineHeight: lineHeights.normal }}>
              Terra Design System
            </span>
            <TokenValue name={name} value={`${value} / ${px(value)}`} />
          </div>
        ))}
      </section>
      <section className="foundation-weight-grid" aria-label="글자 굵기">
        {Object.entries(fontWeights).map(([name, value]) => (
          <div key={name}>
            <span style={{ fontWeight: value }}>Aa</span>
            <TokenValue name={name} value={value} />
          </div>
        ))}
      </section>
      <section className="foundation-role-card">
        <h3>Semantic type scale</h3>
        {[semanticFontSizes.heading, semanticFontSizes.body].map(
          (group, index) => (
            <div
              className="foundation-token-list"
              key={index === 0 ? 'heading' : 'body'}
            >
              {Object.entries(group).map(([name, value]) => (
                <TokenValue
                  key={name}
                  name={`${index === 0 ? 'heading' : 'body'}.${name}`}
                  value={value}
                />
              ))}
            </div>
          ),
        )}
      </section>
    </div>
  );
}

export function SpacingTokens() {
  return (
    <div className="foundation-spacing-list" aria-label="간격 토큰">
      {Object.entries(spacing).map(([name, value]) => (
        <div className="foundation-spacing-row" key={name}>
          <code>{name}</code>
          <div className="foundation-spacing-track">
            <span style={{ width: value }} />
          </div>
          <span>{value}</span>
          <span>{px(value)}</span>
        </div>
      ))}
    </div>
  );
}

export function ShapeAndShadowTokens() {
  return (
    <div className="foundation-stack">
      <div className="foundation-shape-grid">
        {Object.entries(radii).map(([name, value]) => (
          <div className="foundation-shape-card" key={name}>
            <div style={{ borderRadius: value }} />
            <TokenValue name={name} value={value} />
          </div>
        ))}
      </div>
      <div className="foundation-shadow-grid">
        {Object.entries(shadows).map(([name, value]) => (
          <div className="foundation-shadow-card" key={name}>
            <div style={{ boxShadow: shadowValue(value) }} />
            <TokenValue name={name} value={shadowValue(value)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MotionAndLayerTokens() {
  return (
    <div className="foundation-three-columns">
      <section className="foundation-role-card">
        <h3>Semantic duration</h3>
        <div className="foundation-token-list">
          {Object.entries(semanticDuration).map(([name, value]) => (
            <TokenValue key={name} name={name} value={value} />
          ))}
        </div>
        <h3>Primitive duration</h3>
        <div className="foundation-token-list">
          {Object.entries(primitiveDuration).map(([name, value]) => (
            <TokenValue key={name} name={name} value={value} />
          ))}
        </div>
      </section>
      <section className="foundation-role-card">
        <h3>Animation</h3>
        <div className="foundation-token-list">
          {Object.entries(animations).map(([name, value]) => (
            <TokenValue key={name} name={name} value={value} />
          ))}
        </div>
      </section>
      <section className="foundation-role-card">
        <h3>Layer</h3>
        <div className="foundation-token-list">
          {Object.entries(zIndex).map(([name, value]) => (
            <TokenValue key={name} name={name} value={value} />
          ))}
        </div>
        <h3>Opacity</h3>
        <div className="foundation-token-list">
          {Object.entries(semanticOpacity).map(([name, value]) => (
            <TokenValue key={name} name={name} value={value} />
          ))}
          {Object.entries(primitiveOpacity).map(([name, value]) => (
            <TokenValue key={name} name={name} value={value} />
          ))}
        </div>
      </section>
    </div>
  );
}
