import React, { useContext } from "react";
import * as Styled from "./styled";


Table.TD = function TD({ children, ...props }) {
    return (
        <Styled.TD {...props}>
            {children}
        </Styled.TD>
    );
};

Table.TR = function TR(props) {
    return <Styled.TR {...props} />;
};

Table.TH = function TH({ children, ...props }) {
    return (
        <Styled.TH {...props}>
            {children}
        </Styled.TH>
    );
};

export default function Table({ children, ...props }) {
    const rows = props.data.map((el, idx) => (
        <Table.TR key={idx}>
            {Object.values(el).map((el, idx) => (
                <Table.TD key={idx}>{el}</Table.TD>
            ))}
        </Table.TR>
    ));
    return (

        <Styled.Table {...props}>
            <thead>
                <Table.TR>
                    {Object.keys(props.data[0]).map((el, idx) => (
                        <Table.TH key={idx}>
                            <label>{el}</label>
                        </Table.TH>
                    ))}
                </Table.TR>
            </thead>
            <tbody>
                {rows}
                {children}
            </tbody>
        </Styled.Table>

    );
}