import { memo } from "react";

const Component = ({ className }) =>
    <img className={className} src="/blocks-wave.svg" />
;

export const BlocksWave = memo(Component);